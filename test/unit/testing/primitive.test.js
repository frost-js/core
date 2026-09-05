import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { isArray, isBoolean, isFunction, isNaN, isNull, isObject, isString, isUndefined } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockObject from '../../support/mocks/mock-object.js';

describe('Testing (Primitive)', function() {
    describe('#isArray', function() {
        it.each([
            ['works with array', mockArray, true],
            ['works with array-like', new MockArrayLike, false],
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
                isArray(input),
                expected,
            );
        });
    });

    describe('#isBoolean', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, true],
            ['works with boolean false', false, true],
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
                isBoolean(input),
                expected,
            );
        });
    });

    describe('#isFunction', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, true],
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
                isFunction(input),
                expected,
            );
        });
    });

    describe('#isNaN', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, true],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isNaN(input),
                expected,
            );
        });
    });

    describe('#isNull', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, true],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isNull(input),
                expected,
            );
        });
    });

    describe('#isObject', function() {
        it.each([
            ['works with array', mockArray, true],
            ['works with array-like', new MockArrayLike, true],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, true],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, true],
            ['works with plain object', mockPlainObject, true],
            ['works with string', mockString, false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isObject(input),
                expected,
            );
        });
    });

    describe('#isString', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, true],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, true],
            ['works with symbol', Symbol('test'), false],
            ['works with undefined', undefined, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isString(input),
                expected,
            );
        });
    });

    describe('#isUndefined', function() {
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
            ['works with plain object', mockPlainObject, false],
            ['works with string', mockString, false],
            ['works with undefined', undefined, true],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isUndefined(input),
                expected,
            );
        });
    });
});
