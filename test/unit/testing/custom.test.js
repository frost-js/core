import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'vitest';
import { isArrayLike, isNumeric, isPlainObject } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockObject from '../../support/mocks/mock-object.js';

describe('Testing (Custom)', () => {
    describe('#isArrayLike', () => {
        it.each([
            ['works with array', mockArray, true],
            ['works with array-like', new MockArrayLike(), true],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject(), false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', (_, input, expected) => {
            assert.strictEqual(
                isArrayLike(input),
                expected,
            );
        });

        it('excludes forms with a shadowed nodeType', () => {
            const control = {};
            const form = Object.assign(Object.create({ nodeType: 1 }), {
                0: control,
                length: 1,
                nodeType: control,
            });

            assert.strictEqual(isArrayLike(form), false);
        });

        it('excludes windows with a shadowed document defaultView', () => {
            const view = { length: 0 };
            view.document = Object.assign(Object.create({ nodeType: 9, defaultView: view }), {
                defaultView: {},
            });

            assert.strictEqual(isArrayLike(view), false);
        });

        it('recognizes iterable values', () => {
            assert.strictEqual(isArrayLike(new Set([1, 2, 3])), true);
            assert.strictEqual(isArrayLike(new Uint8Array([1, 2, 3])), true);
        });
    });

    describe('#isNumeric', () => {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike(), false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, true],
            ['works with numeric string', mockNumericString, true],
            ['works with decimal string', '12.5', true],
            ['works with hexadecimal string', '0x10', true],
            ['rejects numeric strings with units', '12px', false],
            ['rejects empty strings', '', false],
            ['rejects whitespace strings', '   ', false],
            ['works with object', new MockObject(), false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with symbol', Symbol('test'), false],
            ['works with undefined', undefined, false],
        ])('%s', (_, input, expected) => {
            assert.strictEqual(
                isNumeric(input),
                expected,
            );
        });
    });

    describe('#isPlainObject', () => {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike(), false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject(), false],
            ['works with plain object', mockPlainObject, true],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', (_, input, expected) => {
            assert.strictEqual(
                isPlainObject(input),
                expected,
            );
        });

        it('works with null-prototype and shadowed-constructor objects', () => {
            assert.strictEqual(isPlainObject(Object.create(null)), true);
            assert.strictEqual(isPlainObject({ constructor: null }), true);
        });

        it('recognizes plain objects from another context', () => {
            assert.strictEqual(isPlainObject(runInNewContext('({})')), true);
            assert.strictEqual(isPlainObject(runInNewContext('(new class Example {})')), false);
        });
    });
});
