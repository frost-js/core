import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { isArray, isBoolean, isFunction, isNaN, isNull, isObject, isString, isUndefined } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockObject from '../../support/mocks/mock-object.js';

describe('Testing (Primitive)', function() {
    describe('#isArray', function() {
        it('works with array', function() {
            assert.strictEqual(
                isArray(mockArray),
                true,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isArray(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isArray(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isArray(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isArray(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isArray(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isArray(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isArray(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isArray(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isArray(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isArray(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isArray(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isArray(undefined),
                false,
            );
        });
    });

    describe('#isBoolean', function() {
        it('works with array', function() {
            assert.strictEqual(
                isBoolean(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isBoolean(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isBoolean(true),
                true,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isBoolean(false),
                true,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isBoolean(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isBoolean(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isBoolean(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isBoolean(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isBoolean(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isBoolean(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isBoolean(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isBoolean(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isBoolean(undefined),
                false,
            );
        });
    });

    describe('#isFunction', function() {
        it('works with array', function() {
            assert.strictEqual(
                isFunction(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isFunction(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isFunction(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isFunction(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isFunction(mockFunction),
                true,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isFunction(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isFunction(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isFunction(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isFunction(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isFunction(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isFunction(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isFunction(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isFunction(undefined),
                false,
            );
        });
    });

    describe('#isNaN', function() {
        it('works with array', function() {
            assert.strictEqual(
                isNaN(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isNaN(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isNaN(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isNaN(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isNaN(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isNaN(NaN),
                true,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isNaN(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isNaN(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isNaN(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isNaN(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isNaN(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isNaN(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isNaN(undefined),
                false,
            );
        });
    });

    describe('#isNull', function() {
        it('works with array', function() {
            assert.strictEqual(
                isNull(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isNull(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isNull(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isNull(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isNull(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isNull(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isNull(null),
                true,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isNull(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isNull(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isNull(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isNull(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isNull(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isNull(undefined),
                false,
            );
        });
    });

    describe('#isObject', function() {
        it('works with array', function() {
            assert.strictEqual(
                isObject(mockArray),
                true,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isObject(new MockArrayLike),
                true,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isObject(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isObject(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isObject(mockFunction),
                true,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isObject(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isObject(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isObject(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isObject(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isObject(new MockObject),
                true,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isObject(mockPlainObject),
                true,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isObject(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isObject(undefined),
                false,
            );
        });
    });

    describe('#isString', function() {
        it('works with array', function() {
            assert.strictEqual(
                isString(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isString(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isString(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isString(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isString(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isString(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isString(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isString(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isString(mockNumericString),
                true,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isString(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isString(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isString(mockString),
                true,
            );
        });

        it('works with symbol', function() {
            assert.strictEqual(
                isString(Symbol('test')),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isString(undefined),
                false,
            );
        });
    });

    describe('#isUndefined', function() {
        it('works with array', function() {
            assert.strictEqual(
                isUndefined(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isUndefined(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isUndefined(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isUndefined(false),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isUndefined(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isUndefined(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isUndefined(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isUndefined(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isUndefined(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isUndefined(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isUndefined(mockPlainObject),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isUndefined(mockString),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isUndefined(undefined),
                true,
            );
        });
    });
});
