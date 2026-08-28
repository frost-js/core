import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { diff, intersect, merge, randomValue, range, unique, wrap } from '../../src/index.js';
import { mockArray, mockNumber, mockPlainObject, mockString } from '../support/fixtures.js';
import MockArrayLike from '../support/mocks/mock-array-like.js';

describe('Array', function() {
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
        it('always returns a valid element', function() {
            const array = [1, 2, 3, 4, 5];

            let i;
            for (i = 0; i < 1000; i++) {
                assert.ok(
                    array.includes(
                        randomValue(array),
                    ),
                );
            }
        });

        it('does not always return the same element', function() {
            const array = [1, 2, 3, 4, 5];
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                found.add(
                    randomValue(array),
                );
            }

            assert.strictEqual(found.size, array.length);
        });
    });

    describe('#range', function() {
        it('works with incrementing integers', function() {
            assert.deepStrictEqual(
                range(0, 10),
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            );
        });

        it('works with incrementing decimals', function() {
            assert.deepStrictEqual(
                range(0, 1, .1),
                [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1],
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

        it('works with decrementing integers', function() {
            assert.deepStrictEqual(
                range(0, -10),
                [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10],
            );
        });

        it('works with decrementing decimals', function() {
            assert.deepStrictEqual(
                range(0, -1, .1),
                [0, -.1, -.2, -.3, -.4, -.5, -.6, -.7, -.8, -.9, -1],
            );
        });

        it('works with an offset', function() {
            assert.deepStrictEqual(
                range(10, 20),
                [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            );
        });

        it('works with a negative offset', function() {
            assert.deepStrictEqual(
                range(-10, -20),
                [-10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20],
            );
        });

        it('returns an empty array for a step of zero', function() {
            assert.deepStrictEqual(
                range(0, 10, 0),
                [],
            );
        });

        it('works with a negative step size', function() {
            assert.deepStrictEqual(
                range(0, 5, -1),
                [0, 1, 2, 3, 4, 5],
            );
        });
    });

    describe('#unique', function() {
        it('returns the unique elements', function() {
            assert.deepStrictEqual(
                unique(
                    [1, 2, 2, 3, 4, 5],
                ),
                [1, 2, 3, 4, 5],
            );
        });

        it('only removes "strict" duplicates', function() {
            assert.deepStrictEqual(
                unique(
                    [1, 2, '2', 3, 4, 5],
                ),
                [1, 2, '2', 3, 4, 5],
            );
        });
    });

    describe('#wrap', function() {
        it('returns an array from an array', function() {
            assert.deepStrictEqual(
                wrap(mockArray),
                mockArray,
            );
        });

        it('returns an array from an array-like', function() {
            assert.deepStrictEqual(
                wrap(new MockArrayLike()),
                [1, 2, 3],
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

        it('returns an array from false', function() {
            assert.deepStrictEqual(
                wrap(false),
                [false],
            );
        });

        it('returns an array from null', function() {
            assert.deepStrictEqual(
                wrap(null),
                [null],
            );
        });

        it('returns an array from a number', function() {
            assert.deepStrictEqual(
                wrap(mockNumber),
                [mockNumber],
            );
        });

        it('returns an array from an object', function() {
            assert.deepStrictEqual(
                wrap(mockPlainObject),
                [mockPlainObject],
            );
        });

        it('returns an array from a string', function() {
            assert.deepStrictEqual(
                wrap(mockString),
                [mockString],
            );
        });

        it('returns an array from true', function() {
            assert.deepStrictEqual(
                wrap(true),
                [true],
            );
        });

        it('returns an empty array from undefined', function() {
            assert.deepStrictEqual(
                wrap(undefined),
                [],
            );
        });
    });
});
