import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'vitest';
import { extend, flatten, forgetDot, getDot, hasDot, pluckDot, setDot } from '../../src/index.js';

describe('Object', () => {
    describe('#extend', () => {
        it('extends the first object', () => {
            const obj = {};
            extend(obj, { a: 1 });

            assert.deepStrictEqual(obj, { a: 1 });
        });

        it('ignores null and undefined sources', () => {
            assert.deepStrictEqual(
                extend({}, null, undefined, { a: 1 }),
                { a: 1 },
            );
        });

        it('returns the extended object', () => {
            assert.deepStrictEqual(
                extend({}, { a: 1 }),
                { a: 1 },
            );
        });

        it('works with deep objects', () => {
            assert.deepStrictEqual(
                extend(
                    { a: 1 },
                    { b: { c: 1 } },
                ),
                { a: 1, b: { c: 1 } },
            );
        });

        it('works with multiple arguments', () => {
            assert.deepStrictEqual(
                extend(
                    { a: 1 },
                    { b: 2 },
                    { c: 3 },
                ),
                { a: 1, b: 2, c: 3 },
            );
        });

        it('works with overwriting properties', () => {
            assert.deepStrictEqual(
                extend(
                    { a: 1, b: 2 },
                    { b: 3, c: 4 },
                ),
                { a: 1, b: 3, c: 4 },
            );
        });

        it('does not copy objects by reference', () => {
            const b = { c: 1 };
            const result = extend(
                { a: 1 },
                { b },
            );
            b.d = 1;
            assert.deepStrictEqual(
                result,
                { a: 1, b: { c: 1 } },
            );
        });

        it('deep-merges objects from another context without retaining source references', () => {
            const source = runInNewContext('({ nested: { value: 1 } })');
            const result = extend({ nested: { existing: true } }, source);

            source.nested.value = 2;

            assert.deepStrictEqual(result, { nested: { existing: true, value: 1 } });
        });

        it('does not copy arrays by reference', () => {
            const b = [1, 2, 3];
            const result = extend(
                { a: 1 },
                { b },
            );
            b.push(4);
            assert.deepStrictEqual(
                result,
                { a: 1, b: [1, 2, 3] },
            );
        });

        it('preserves sparse array lengths without shortening existing arrays', () => {
            const source = { items: new Array(3) };

            assert.deepStrictEqual(extend({}, source), source);
            assert.deepStrictEqual(
                extend({ items: [1, 2, 3, 4] }, source),
                { items: [1, 2, 3, 4] },
            );
        });

        it('does not copy inherited properties', () => {
            function TestObject() {
                this.a = 1;
            }

            TestObject.prototype.b = 2;

            assert.deepStrictEqual(
                extend({}, new TestObject()),
                { a: 1 },
            );
        });

        it('copies prototype-shaped keys without changing the prototype', () => {
            const source = JSON.parse('{"__proto__":{"value":1},"constructor":{"prototype":{"value":2}},"prototype":{"value":3}}');
            const result = extend({}, source);

            assert.deepStrictEqual(result, source);
            assert.strictEqual(Object.getPrototypeOf(result), Object.prototype);
            assert.strictEqual({}.value, undefined);
        });
    });

    describe('#flatten', () => {
        it('flattens the object', () => {
            const obj = { a: 1, b: 2 };

            assert.deepStrictEqual(flatten(obj), obj);
        });

        it('works with deep objects', () => {
            const obj = { a: { b: 1, c: 2 }, d: 3 };

            assert.deepStrictEqual(flatten(obj), {
                'a.b': 1,
                'a.c': 2,
                'd': 3,
            });
        });

        it('creates a new object', () => {
            const obj = { a: 1, b: 2 };
            const flattened = flatten(obj);

            obj.a = 3;

            assert.deepStrictEqual(flattened, { a: 1, b: 2 });
        });

        it('preserves empty objects and __proto__ keys', () => {
            const flattened = flatten(
                JSON.parse('{"empty":{},"__proto__":"value"}'),
            );

            assert.deepStrictEqual(Object.keys(flattened), ['empty', '__proto__']);
            assert.deepStrictEqual(flattened.empty, {});
            assert.strictEqual(flattened.__proto__, 'value');
            assert.strictEqual(Object.getPrototypeOf(flattened), Object.prototype);
        });
    });

    describe('#forgetDot', () => {
        it('removes the property', () => {
            const obj = { a: 1, b: 2 };
            forgetDot(obj, 'a');

            assert.deepStrictEqual(obj, { b: 2 });
        });

        it('has no return value', () => {
            assert.strictEqual(
                forgetDot({ a: 1 }, 'a'),
                undefined,
            );
        });

        it('works with deep objects', () => {
            const obj = { a: { b: 1, c: 2 }, d: 3 };
            forgetDot(obj, 'a.b');

            assert.deepStrictEqual(
                obj,
                { a: { c: 2 }, d: 3 },
            );
        });

        it('handles empty path segments', () => {
            const obj = { user: { '': { name: 'Ada' } } };
            forgetDot(obj, 'user..name');

            assert.deepStrictEqual(
                obj,
                { user: { '': {} } },
            );
        });

        it('works with properties that do not exist', () => {
            const obj = { a: 1, b: 2 };
            forgetDot(obj, 'c');

            assert.deepStrictEqual(
                obj,
                { a: 1, b: 2 },
            );
        });
    });

    describe('#getDot', () => {
        it('returns the value', () => {
            assert.strictEqual(
                getDot(
                    { a: 1, b: 2 },
                    'b',
                ),
                2,
            );
        });

        it('works with deep objects', () => {
            assert.strictEqual(
                getDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.c',
                ),
                2,
            );
        });

        it('works with properties that do not exist', () => {
            assert.strictEqual(
                getDot(
                    { a: 1, b: 2 },
                    'c',
                ),
                undefined,
            );
        });

        it('handles empty path segments', () => {
            const object = { user: { '': { name: 'Ada' } } };

            assert.strictEqual(getDot(object, 'user..name'), 'Ada');
            assert.strictEqual(getDot({ user: {} }, 'user..missing', 'fallback'), 'fallback');
        });

        it('does not retrieve inherited properties', () => {
            assert.strictEqual(
                getDot({}, 'toString', 'fallback'),
                'fallback',
            );
        });
    });

    describe('#hasDot', () => {
        it('returns true if the property exists', () => {
            assert.strictEqual(
                hasDot(
                    { a: 1, b: 2 },
                    'b',
                ),
                true,
            );
        });

        it('works with deep objects', () => {
            assert.strictEqual(
                hasDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.b',
                ),
                true,
            );
        });

        it('works with properties that do not exist', () => {
            assert.strictEqual(
                hasDot(
                    { a: 1, b: 2 },
                    'c',
                ),
                false,
            );
        });

        it('works with deep objects, when the property does not exist', () => {
            assert.strictEqual(
                hasDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.e',
                ),
                false,
            );
        });

        it('handles empty path segments', () => {
            const object = { user: { '': { name: 'Ada' } } };

            assert.strictEqual(hasDot(object, 'user..name'), true);
            assert.strictEqual(hasDot({ user: {} }, 'user..missing'), false);
        });

        it('does not find inherited properties', () => {
            assert.strictEqual(hasDot({}, 'toString'), false);
        });
    });

    describe('#pluckDot', () => {
        it('returns the values', () => {
            assert.deepStrictEqual(
                pluckDot(
                    [
                        { a: 1, b: 2 },
                        { a: 3, b: 4 },
                        { a: 5, b: 6 },
                    ],
                    'b',
                ),
                [2, 4, 6],
            );
        });

        it('works with deep objects', () => {
            assert.deepStrictEqual(
                pluckDot(
                    [
                        { a: 1, b: { c: 2, d: 3 } },
                        { a: 4, b: { c: 5, d: 6 } },
                        { a: 7, b: { c: 8, d: 9 } },
                    ],
                    'b.d',
                ),
                [3, 6, 9],
            );
        });

        it('works with properties that do not exist', () => {
            assert.deepStrictEqual(
                pluckDot(
                    [
                        { b: 1 },
                        { a: 2 },
                        { b: 3 },
                    ],
                    'a',
                ),
                [undefined, 2, undefined],
            );
        });
    });

    describe('#setDot', () => {
        it('sets the value', () => {
            const obj = { a: 1 };
            setDot(obj, 'b', 2);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: 2 },
            );
        });

        it('works with deep objects', () => {
            const obj = { a: 1 };
            setDot(obj, 'b.c', 2);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 2 } },
            );
        });

        it('handles empty path segments', () => {
            const obj = {};
            setDot(obj, 'user..name', 'Ada');

            assert.deepStrictEqual(
                obj,
                { user: { '': { name: 'Ada' } } },
            );
        });

        it('works when overwriting existing values', () => {
            const obj = { a: 1, b: { c: 2 } };
            setDot(obj, 'b.c', 3);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 3 } },
            );
        });

        it('works with wildcard properties', () => {
            const obj = { a: 1, b: { c: 2, d: 3, e: 4 } };
            setDot(obj, 'b.*', 3);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 3, d: 3, e: 3 } },
            );
        });

        it('respects overwrite option with wildcard properties', () => {
            const obj = { a: 1, b: { c: 2, d: 3, e: 4 } };
            setDot(obj, 'b.*', 3, { overwrite: false });

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 2, d: 3, e: 4 } },
            );
        });

        it('uses wildcard keys without reparsing them', () => {
            const obj = {
                '*': { active: false },
                'a.b': { active: false },
            };

            setDot(obj, '*.active', true);

            assert.deepStrictEqual(obj, {
                '*': { active: true },
                'a.b': { active: true },
            });
        });

        it('does not overwrite intermediate values when disabled', () => {
            const obj = { a: 1 };

            setDot(obj, 'a.b', 2, { overwrite: false });

            assert.deepStrictEqual(obj, { a: 1 });
        });

        it('creates prototype-shaped paths as own data', () => {
            const obj = {};

            setDot(obj, '__proto__.polluted', true);
            setDot(obj, 'constructor.prototype.value', true);

            assert.strictEqual(Object.getPrototypeOf(obj), Object.prototype);
            assert.strictEqual(Object.prototype.polluted, undefined);
            assert.deepStrictEqual(obj.__proto__, { polluted: true });
            assert.deepStrictEqual(obj.constructor, { prototype: { value: true } });
        });
    });
});
