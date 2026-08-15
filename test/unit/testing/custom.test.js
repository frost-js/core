import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import { isArrayLike, isNumeric, isPlainObject } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockObject from '../../support/mocks/mock-object.js';

describe('Testing (Custom)', function() {
    describe('#isArrayLike', function() {
        it('works with array', function() {
            assert.strictEqual(
                isArrayLike(mockArray),
                true,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isArrayLike(new MockArrayLike),
                true,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isArrayLike(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isArrayLike(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isArrayLike(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isArrayLike(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isArrayLike(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isArrayLike(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isArrayLike(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isArrayLike(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isArrayLike(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isArrayLike(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isArrayLike(undefined),
                false,
            );
        });
    });

    describe('#isNumeric', function() {
        it('works with array', function() {
            assert.strictEqual(
                isNumeric(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isNumeric(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isNumeric(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isNumeric(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isNumeric(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isNumeric(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isNumeric(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isNumeric(mockNumber),
                true,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isNumeric(mockNumericString),
                true,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isNumeric(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isNumeric(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isNumeric(mockString),
                false,
            );
        });

        it('works with symbol', function() {
            assert.strictEqual(
                isNumeric(Symbol('test')),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isNumeric(undefined),
                false,
            );
        });
    });

    describe('#isPlainObject', function() {
        it('works with array', function() {
            assert.strictEqual(
                isPlainObject(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isPlainObject(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isPlainObject(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isPlainObject(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isPlainObject(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isPlainObject(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isPlainObject(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isPlainObject(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isPlainObject(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isPlainObject(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isPlainObject(mockPlainObject),
                true,
            );
        });

        it('works with null-prototype and shadowed-constructor objects', function() {
            assert.strictEqual(isPlainObject(Object.create(null)), true);
            assert.strictEqual(isPlainObject({ constructor: null }), true);
        });

        it('works with string', function() {
            assert.strictEqual(
                isPlainObject(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isPlainObject(undefined),
                false,
            );
        });
    });
});
