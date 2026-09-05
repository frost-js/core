import assert from 'node:assert/strict';
import { afterEach, describe, it, vi } from 'vitest';
import { clamp, clampPercent, dist, inverseLerp, lerp, map, random, randomInt, toStep } from '../../src/index.js';

describe('Math', function() {
    afterEach(function() {
        vi.restoreAllMocks();
    });

    describe('#clamp', function() {
        it.each([
            ['returns a value in range', [0, -50, 50], 0],
            ['works with default arguments', [0.5], 0.5],
            ['clamps to lower bounds', [-100, -50, 50], -50],
            ['clamps to lower bounds with default arguments', [-1], 0],
            ['clamps to upper bounds', [100, -50, 50], 50],
            ['clamps to upper bounds with default arguments', [2], 1],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(
                clamp(...args),
                expected,
            );
        });
    });

    describe('#clampPercent', function() {
        it.each([
            ['returns a value in range', 50, 50],
            ['clamps to lower bounds', -50, 0],
            ['clamps to upper bounds', 150, 100],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                clampPercent(input),
                expected,
            );
        });
    });

    describe('#dist', function() {
        it.each([
            ['returns the distance between points', [0, 0, 3, 4], 5],
            ['works with negative coordinates', [-1, -2, 2, 2], 5],
            ['returns zero for identical points', [2, 3, 2, 3], 0],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(dist(...args), expected);
        });
    });

    describe('#inverseLerp', function() {
        it.each([
            ['returns the inverse interpolated value', [50, 100, 75], .5],
            ['works from negative numbers', [-100, 100, 50], .75],
            ['works to negative numbers', [100, -100, -50], .75],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(
                inverseLerp(...args),
                expected,
            );
        });
    });

    describe('#lerp', function() {
        it.each([
            ['returns the interpolated value', [50, 100, .5], 75],
            ['works from negative numbers', [-100, 100, .75], 50],
            ['works to negative numbers', [100, -100, .75], -50],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(
                lerp(...args),
                expected,
            );
        });
    });

    describe('#map', function() {
        it.each([
            ['returns the mapped value', [25, 10, 50, 25, 150], 71.875],
            ['works from negative start', [5, -10, 50, 25, 150], 56.25],
            ['works from negative end', [-5, 10, -50, 25, 150], 56.25],
            ['works to negative start', [25, 10, 50, -25, 50], 3.125],
            ['works to negative end', [25, 10, 50, 25, -50], -3.125],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(
                map(...args),
                expected,
            );
        });
    });

    describe('#random', function() {
        it.each([
            ['works with default arguments', [], 0.25, 0.25],
            ['works with a lower bound', [10, 50], 0.25, 20],
            ['works with an upper bound', [10], 0.75, 7.5],
            ['works with a negative range', [-50, -10], 0.25, -40],
            ['includes the lower bound', [10, 50], 0, 10],
            ['approaches the upper bound', [0, 1], 1 - Number.EPSILON, 1 - Number.EPSILON],
        ])('%s', function(_, args, sample, expected) {
            vi.spyOn(Math, 'random').mockReturnValue(sample);

            assert.strictEqual(random(...args), expected);
        });
    });

    describe('#randomInt', function() {
        it.each([
            ['works with default arguments', [], 0.75, 0],
            ['works with a lower bound', [10, 50], 0.26, 20],
            ['works with an upper bound', [10], 0.75, 7],
            ['works with a negative range', [-50, -10], 0.26, -40],
            ['works with numbers larger than 32-bit', [0, 2 ** 32], 0.75, 3221225472],
            ['accepts reversed bounds', [50, 10], 0.26, 20],
            ['includes the lower bound', [10, 50], 0, 10],
            ['excludes the upper bound', [10, 50], 1 - Number.EPSILON, 49],
            ['rounds fractional lower bounds up', [1.2, 5.8], 0, 2],
            ['honors fractional upper bounds', [1.2, 5.8], 1 - Number.EPSILON, 5],
        ])('%s', function(_, args, sample, expected) {
            vi.spyOn(Math, 'random').mockReturnValue(sample);

            assert.strictEqual(randomInt(...args), expected);
        });

        it('excludes the upper bound with a large lower bound', function() {
            const min = 2 ** 52;
            vi.spyOn(Math, 'random').mockReturnValue(0.75);

            assert.strictEqual(randomInt(min, min + 1), min);
        });

        it.each([
            [0.1, 0.9],
            [0, 0],
        ])('rejects bounds without an integer: %s to %s', function(min, max) {
            assert.throws(
                (_) => randomInt(min, max),
                RangeError,
            );
        });
    });

    describe('#toStep', function() {
        it.each([
            ['works with a decimal', [0.123456, .1], 0.1],
            ['works with scientific notation', [0.00000014, 1e-7], 1e-7],
            ['works with a fraction', [1.23456, 1 / 4], 1.25],
            ['works with a whole number', [123.456, 33], 132],
            ['works with a negative step size', [0.123456, -0.1], 0.1],
            ['returns the input value for a step of zero', [123.456, 0], 123.456],
        ])('%s', function(_, args, expected) {
            assert.strictEqual(
                toStep(...args),
                expected,
            );
        });
    });
});
