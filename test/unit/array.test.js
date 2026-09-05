import assert from 'node:assert/strict';
import { afterEach, describe, it, vi } from 'vitest';
import { diff, intersect, merge, randomValue, range, unique, wrap } from '../../src/index.js';
import { mockArray, mockNumber, mockPlainObject, mockString } from '../support/fixtures.js';
import MockArrayLike from '../support/mocks/mock-array-like.js';

describe('Array', function() {
    afterEach(function() {
        vi.restoreAllMocks();
    });

    describe('#diff', function() {
        it('returns the elements that exist only in the first array', function() {
            assert.deepStrictEqual(
                diff(
                    [1, 2, 3, 4, 5],
                    [2, 4],
                    [5, 6],
                ),
                [1, 3],
            );
        });
    });

    describe('#intersect', function() {
        it('returns an empty array without inputs', function() {
            assert.deepStrictEqual(intersect(), []);
        });

        it('returns the elements that exist in all arrays', function() {
            assert.deepStrictEqual(
                intersect(
                    [1, 2, 3, 4, 5],
                    [2, 4, 6, 8],
                    [1, 2, 3, 4],
                ),
                [2, 4],
            );
        });

        it('preserves the first array order and removes duplicates', function() {
            assert.deepStrictEqual(
                intersect([3, NaN, 2, 3], [NaN, 3]),
                [3, NaN],
            );
        });
    });

    describe('#merge', function() {
        it('merges the elements to the first array', function() {
            const test = [1];
            merge(test, [2, 3], [4, 5]);
            assert.deepStrictEqual(
                test,
                [1, 2, 3, 4, 5],
            );
        });

        it('returns the merged array', function() {
            assert.deepStrictEqual(
                merge([], [1], [2, 3], [4, 5]),
                [1, 2, 3, 4, 5],
            );
        });

        it('can merge an array into itself', function() {
            const array = [1, 2, 3];

            assert.deepStrictEqual(
                merge(array, array),
                [1, 2, 3, 1, 2, 3],
            );
        });

        it('merges arrays too large for argument spreading', function() {
            const array = new Array(200000).fill(1);

            assert.strictEqual(merge([], array).length, array.length);
        });
    });

    describe('#randomValue', function() {
        it.each([
            [0, 'a'],
            [0.25, 'b'],
            [0.5, 'c'],
            [0.75, 'd'],
            [1 - Number.EPSILON, 'e'],
        ])('selects %s -> %s', function(sample, expected) {
            vi.spyOn(Math, 'random').mockReturnValue(sample);

            assert.strictEqual(randomValue(['a', 'b', 'c', 'd', 'e']), expected);
        });

        it('returns null for an empty array', function() {
            assert.strictEqual(randomValue([]), null);
        });
    });

    describe('#range', function() {
        it.each([
            ['works with incrementing integers', [0, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            ['works with incrementing decimals', [0, 1, .1], [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]],
            ['includes a decimal endpoint with a nonzero start', [1, 1.4, 0.1], [1, 1.1, 1.2, 1.3, 1.4]],
            ['excludes decimal endpoints between steps', [1, 1.35, 0.1], [1, 1.1, 1.2, 1.3]],
            ['works with decrementing integers', [0, -10], [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]],
            ['works with decrementing decimals', [0, -1, .1], [0, -.1, -.2, -.3, -.4, -.5, -.6, -.7, -.8, -.9, -1]],
            ['works with an offset', [10, 20], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
            ['works with a negative offset', [-10, -20], [-10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20]],
            ['returns an empty array for a step of zero', [0, 10, 0], []],
            ['works with a negative step size', [0, 5, -1], [0, 1, 2, 3, 4, 5]],
        ])('%s', function(_, args, expected) {
            assert.deepStrictEqual(
                range(...args),
                expected,
            );
        });

        it('includes a floating-point endpoint', function() {
            assert.deepStrictEqual(
                range(0, 0.3, 0.1),
                [0, 0.1, 0.2, 0.3],
            );
            assert.deepStrictEqual(
                range(0.1, 0.3, 0.1),
                [0.1, 0.2, 0.3],
            );
        });

        it('includes a descending decimal endpoint', function() {
            const values = range(1.4, 1, 0.1);

            assert.strictEqual(values.length, 5);
            assert.strictEqual(values.at(-1), 1);
        });
    });

    describe('#unique', function() {
        it.each([
            ['returns the unique elements', [1, 2, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
            ['only removes "strict" duplicates', [1, 2, '2', 3, 4, 5], [1, 2, '2', 3, 4, 5]],
        ])('%s', function(_, input, expected) {
            assert.deepStrictEqual(
                unique(input),
                expected,
            );
        });
    });

    describe('#wrap', function() {
        it.each([
            ['returns an array from an array', mockArray, mockArray],
            ['returns an array from an array-like', new MockArrayLike(), [1, 2, 3]],
            ['returns an array from false', false, [false]],
            ['returns an array from null', null, [null]],
            ['returns an array from a number', mockNumber, [mockNumber]],
            ['returns an array from an object', mockPlainObject, [mockPlainObject]],
            ['returns an array from a string', mockString, [mockString]],
            ['returns an array from true', true, [true]],
            ['returns an empty array from undefined', undefined, []],
        ])('%s', function(_, input, expected) {
            assert.deepStrictEqual(
                wrap(input),
                expected,
            );
        });

        it('copies iterable values', function() {
            assert.deepStrictEqual(
                wrap(new Set([1, 2, 3])),
                [1, 2, 3],
            );
            assert.deepStrictEqual(
                wrap(new Uint8Array([1, 2, 3])),
                [1, 2, 3],
            );
        });
    });
});
