import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'vitest';
import { extend, flatten, forgetDot, getDot, hasDot, pluckDot, setDot } from '../../src/index.js';

describe('Object', function() {
    describe('#extend', function() {
        it('extends the first object', function() {
            const obj = {};
            extend(obj, { a: 1 });

            assert.deepStrictEqual(obj, { a: 1 });
        });

        it('ignores null and undefined sources', function() {
            assert.deepStrictEqual(
                extend({}, null, undefined, { a: 1 }),
                { a: 1 },
            );
        });

        it('returns the extended object', function() {
            assert.deepStrictEqual(
                extend({}, { a: 1 }),
                { a: 1 },
            );
        });

        it('works with deep objects', function() {
            assert.deepStrictEqual(
                extend(
                    { a: 1 },
                    { b: { c: 1 } },
                ),
                { a: 1, b: { c: 1 } },
            );
        });

        it('works with multiple arguments', function() {
            assert.deepStrictEqual(
                extend(
                    { a: 1 },
                    { b: 2 },
                    { c: 3 },
                ),
                { a: 1, b: 2, c: 3 },
            );
        });

        it('works with overwriting properties', function() {
            assert.deepStrictEqual(
                extend(
                    { a: 1, b: 2 },
                    { b: 3, c: 4 },
                ),
                { a: 1, b: 3, c: 4 },
            );
        });

        it('does not copy objects by reference', function() {
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

        it('deep-merges objects from another context without retaining source references', function() {
            const source = runInNewContext('({ nested: { value: 1 } })');
            const result = extend({ nested: { existing: true } }, source);

            source.nested.value = 2;

            assert.deepStrictEqual(result, { nested: { existing: true, value: 1 } });
        });

        it('does not copy arrays by reference', function() {
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

        it('does not copy inherited properties', function() {
            function TestObject() {
                this.a = 1;
            }

            TestObject.prototype.b = 2;

            assert.deepStrictEqual(
                extend({}, new TestObject),
                { a: 1 },
            );
        });

        it('copies prototype-shaped keys without changing the prototype', function() {
            const source = JSON.parse('{"__proto__":{"value":1},"constructor":{"prototype":{"value":2}},"prototype":{"value":3}}');
            const result = extend({}, source);

            assert.deepStrictEqual(result, source);
            assert.strictEqual(Object.getPrototypeOf(result), Object.prototype);
            assert.strictEqual({}.value, undefined);
        });
    });

    describe('#flatten', function() {
        it('flattens the object', function() {
            const obj = { a: 1, b: 2 };

            assert.deepStrictEqual(flatten(obj), obj);
        });

        it('works with deep objects', function() {
            const obj = { a: { b: 1, c: 2 }, d: 3 };

            assert.deepStrictEqual(flatten(obj), {
                'a.b': 1,
                'a.c': 2,
                'd': 3,
            });
        });

        it('creates a new object', function() {
            const obj = { a: 1, b: 2 };
            const flattened = flatten(obj);

            obj.a = 3;

            assert.deepStrictEqual(flattened, { a: 1, b: 2 });
        });

        it('preserves empty objects and __proto__ keys', function() {
            const flattened = flatten(
                JSON.parse('{"empty":{},"__proto__":"value"}'),
            );

            assert.deepStrictEqual(Object.keys(flattened), ['empty', '__proto__']);
            assert.deepStrictEqual(flattened.empty, {});
            assert.strictEqual(flattened.__proto__, 'value');
            assert.strictEqual(Object.getPrototypeOf(flattened), Object.prototype);
        });
    });

    describe('#forgetDot', function() {
        it('removes the property', function() {
            const obj = { a: 1, b: 2 };
            forgetDot(obj, 'a');

            assert.deepStrictEqual(obj, { b: 2 });
        });

        it('has no return value', function() {
            assert.strictEqual(
                forgetDot({ a: 1 }, 'a'),
                undefined,
            );
        });

        it('works with deep objects', function() {
            const obj = { a: { b: 1, c: 2 }, d: 3 };
            forgetDot(obj, 'a.b');

            assert.deepStrictEqual(
                obj,
                { a: { c: 2 }, d: 3 },
            );
        });

        it('works with properties that do not exist', function() {
            const obj = { a: 1, b: 2 };
            forgetDot(obj, 'c');

            assert.deepStrictEqual(
                obj,
                { a: 1, b: 2 },
            );
        });
    });

    describe('#getDot', function() {
        it('returns the value', function() {
            assert.strictEqual(
                getDot(
                    { a: 1, b: 2 },
                    'b',
                ),
                2,
            );
        });

        it('works with deep objects', function() {
            assert.strictEqual(
                getDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.c',
                ),
                2,
            );
        });

        it('works with properties that do not exist', function() {
            assert.strictEqual(
                getDot(
                    { a: 1, b: 2 },
                    'c',
                ),
                undefined,
            );
        });

        it('does not retrieve inherited properties', function() {
            assert.strictEqual(
                getDot({}, 'toString', 'fallback'),
                'fallback',
            );
        });
    });

    describe('#hasDot', function() {
        it('returns true if the property exists', function() {
            assert.strictEqual(
                hasDot(
                    { a: 1, b: 2 },
                    'b',
                ),
                true,
            );
        });

        it('works with deep objects', function() {
            assert.strictEqual(
                hasDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.b',
                ),
                true,
            );
        });

        it('works with properties that do not exist', function() {
            assert.strictEqual(
                hasDot(
                    { a: 1, b: 2 },
                    'c',
                ),
                false,
            );
        });

        it('works with deep objects, when the property does not exist', function() {
            assert.strictEqual(
                hasDot(
                    { a: { b: 1, c: 2 }, d: 3 },
                    'a.e',
                ),
                false,
            );
        });

        it('does not find inherited properties', function() {
            assert.strictEqual(hasDot({}, 'toString'), false);
        });
    });

    describe('#pluckDot', function() {
        it('returns the values', function() {
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

        it('works with deep objects', function() {
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

        it('works with properties that do not exist', function() {
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

    describe('#setDot', function() {
        it('sets the value', function() {
            const obj = { a: 1 };
            setDot(obj, 'b', 2);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: 2 },
            );
        });

        it('works with deep objects', function() {
            const obj = { a: 1 };
            setDot(obj, 'b.c', 2);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 2 } },
            );
        });

        it('works when overwriting existing values', function() {
            const obj = { a: 1, b: { c: 2 } };
            setDot(obj, 'b.c', 3);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 3 } },
            );
        });

        it('works with wildcard properties', function() {
            const obj = { a: 1, b: { c: 2, d: 3, e: 4 } };
            setDot(obj, 'b.*', 3);

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 3, d: 3, e: 3 } },
            );
        });

        it('respects overwrite option with wildcard properties', function() {
            const obj = { a: 1, b: { c: 2, d: 3, e: 4 } };
            setDot(obj, 'b.*', 3, { overwrite: false });

            assert.deepStrictEqual(
                obj,
                { a: 1, b: { c: 2, d: 3, e: 4 } },
            );
        });

        it('uses wildcard keys without reparsing them', function() {
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

        it('does not overwrite intermediate values when disabled', function() {
            const obj = { a: 1 };

            setDot(obj, 'a.b', 2, { overwrite: false });

            assert.deepStrictEqual(obj, { a: 1 });
        });

        it('creates prototype-shaped paths as own data', function() {
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
