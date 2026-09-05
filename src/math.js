import { isNull } from './testing.js';

/**
 * Math methods
 */

/**
 * Gets the decimal precision represented by a number.
 * @param {number} value The input number.
 * @returns {number} The decimal precision.
 */
const getDecimalPlaces = (value) => {
    const [coefficient, exponent = 0] = `${value}`.toLowerCase().split('e');
    const decimals = (coefficient.split('.')[1] || '').length;
    return Math.max(0, decimals - Number(exponent));
};

/**
 * Clamps a value between a minimum and a maximum.
 * @param {number} value The value to clamp.
 * @param {number} [min=0] The minimum value of the clamped range.
 * @param {number} [max=1] The maximum value of the clamped range.
 * @returns {number} The clamped value.
 */
export const clamp = (value, min = 0, max = 1) =>
    Math.max(
        min,
        Math.min(
            max,
            value,
        ),
    );

/**
 * Clamps a value between 0 and 100.
 * @param {number} value The value to clamp.
 * @returns {number} The clamped value.
 */
export const clampPercent = (value) =>
    clamp(value, 0, 100);

/**
 * Calculates the distance between two vectors.
 * @param {number} x1 The first vector X co-ordinate.
 * @param {number} y1 The first vector Y co-ordinate.
 * @param {number} x2 The second vector X co-ordinate.
 * @param {number} y2 The second vector Y co-ordinate.
 * @returns {number} The distance between the vectors.
 */
export const dist = (x1, y1, x2, y2) =>
    len(
        x1 - x2,
        y1 - y2,
    );

/**
 * Calculates the inverse linear interpolation amount from one value to another.
 * @param {number} v1 The starting value.
 * @param {number} v2 The ending value.
 * @param {number} value The value to inverse interpolate.
 * @returns {number} The interpolated amount.
 */
export const inverseLerp = (v1, v2, value) =>
    (value - v1) / (v2 - v1);

/**
 * Calculates the length of an X,Y vector.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @returns {number} The length of the vector.
 */
export const len = Math.hypot;

/**
 * Calculates a linear interpolation from one value to another.
 * @param {number} v1 The starting value.
 * @param {number} v2 The ending value.
 * @param {number} amount The amount to interpolate.
 * @returns {number} The interpolated value.
 */
export const lerp = (v1, v2, amount) =>
    v1 *
    (1 - amount) +
    v2 *
    amount;

/**
 * Maps a value from one range to another.
 * @param {number} value The value to map.
 * @param {number} fromMin The minimum value of the current range.
 * @param {number} fromMax The maximum value of the current range.
 * @param {number} toMin The minimum value of the target range.
 * @param {number} toMax The maximum value of the target range.
 * @returns {number} The mapped value.
 */
export const map = (value, fromMin, fromMax, toMin, toMax) =>
    (value - fromMin) *
    (toMax - toMin) /
    (fromMax - fromMin) +
    toMin;

/**
 * Returns a random floating-point number.
 * @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
 * @param {number} [b] The maximum value (exclusive).
 * @returns {number} A random number.
 */
export const random = (a = 1, b = null) =>
    isNull(b) ?
        Math.random() * a :
        map(
            Math.random(),
            0,
            1,
            a,
            b,
        );

/**
 * Returns a random integer.
 * @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
 * @param {number} [b] The maximum value (exclusive).
 * @returns {number} A random integer.
 * @throws {RangeError} If the bounds contain no integer.
 */
export const randomInt = (a = 1, b = null) => {
    const min = Math.ceil(
        Math.min(a, isNull(b) ? 0 : b),
    );
    const max = Math.ceil(
        Math.max(a, isNull(b) ? 0 : b),
    );

    if (min >= max) {
        throw new RangeError('The bounds do not contain an integer');
    }

    return min + Math.floor(Math.random() * (max - min));
};

/**
 * Constrains a number to a specified step size.
 * @param {number} value The value to constrain.
 * @param {number} step The step size.
 * @returns {number} The constrained value.
 */
export const toStep = (value, step = 0.01) => {
    if (step === 0) {
        return value;
    }

    step = Math.abs(step);

    const result = Math.round(value / step) * step;
    const precision = getDecimalPlaces(step);

    if (precision > 100) {
        return result;
    }

    return parseFloat(
        result.toFixed(precision),
    );
};
