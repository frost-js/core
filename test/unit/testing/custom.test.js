import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { describe, it } from 'vitest';
import { isArrayLike, isNumeric, isPlainObject } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockObject from '../../support/mocks/mock-object.js';

describe('Testing (Custom)', function() {
    describe('#isArrayLike', function() {
        it.each([
            ['works with array', mockArray, true],
            ['works with array-like', new MockArrayLike, true],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isArrayLike(input),
                expected,
            );
        });
    });

    describe('#isNumeric', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, true],
            ['works with numeric string', mockNumericString, true],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with symbol', Symbol('test'), false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isNumeric(input),
                expected,
            );
        });
    });

    describe('#isPlainObject', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, true],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isPlainObject(input),
                expected,
            );
        });

        it('works with null-prototype and shadowed-constructor objects', function() {
            assert.strictEqual(isPlainObject(Object.create(null)), true);
            assert.strictEqual(isPlainObject({ constructor: null }), true);
        });

        it('recognizes plain objects from another context', function() {
            assert.strictEqual(isPlainObject(runInNewContext('({})')), true);
            assert.strictEqual(isPlainObject(runInNewContext('(new class Example {})')), false);
        });
    });
});
