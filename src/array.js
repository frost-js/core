import { randomInt, toStep } from './math.js';
import { isArray, isArrayLike, isFunction, isObject, isUndefined } from './testing.js';

/**
 * Array methods
 */

/**
 * Creates a new array containing values from the first array that do not exist in any of the additional arrays.
 * @template T
 * @param {T[]} array The input array.
 * @param {...T[]} arrays The arrays to compare against.
 * @returns {T[]} The filtered array.
 */
export const diff = (array, ...arrays) => {
    const sets = arrays.map((other) => new Set(other));
    return array.filter(
        (value) => !sets
            .some((other) => other.has(value)),
    );
};

/**
 * Creates a new array containing the unique values that exist in all of the provided arrays.
 * @template T
 * @param {...T[]} arrays The input arrays.
 * @returns {T[]} The intersected array.
 */
export const intersect = (...arrays) => {
    if (!arrays.length) {
        return [];
    }

    const [array, ...others] = arrays;
    const sets = others.map((other) => new Set(other));
    return unique(array)
        .filter(
            (value) => sets.every((other) => other.has(value)),
        );
};

/**
 * Merges values from one or more arrays or array-like objects into an array.
 * @template T
 * @param {T[]} [array=[]] The array to merge into.
 * @param {...ArrayLike<T>} arrays The arrays or array-like objects to merge.
 * @returns {T[]} The merged array.
 * @throws {RangeError} If an array-like length is infinite.
 */
export const merge = (array = [], ...arrays) => {
    for (const other of arrays) {
        const length = Math.max(0, Math.floor(Number(other.length) || 0));
        if (!Number.isFinite(length)) {
            throw new RangeError('Array-like length must be finite');
        }

        for (let i = 0; i < length; i++) {
            array.push(other[i]);
        }
    }

    return array;
};

/**
 * Selects a random value from an array.
 * @template T
 * @param {T[]} array The input array.
 * @returns {T|null} A random value from the array, or null if the array is empty.
 */
export const randomValue = (array) =>
    array.length ?
        array[randomInt(array.length)] :
        null;

/**
 * Creates an array containing a range of values.
 * @param {number} start The first value of the sequence.
 * @param {number} end The target value for the sequence. It is included only when the step lands on it exactly.
 * @param {number} [step=1] The increment between values in the sequence. Negative values are treated as positive, and `0` returns an empty array.
 * @returns {number[]} The array of values from start toward end.
 */
export const range = (start, end, step = 1) => {
    if (step === 0) {
        return [];
    }

    step = Math.abs(step);
    const direction = Math.sign(end - start);
    const steps = toStep(Math.abs(end - start) / step, 1e-10);

    return Array.from({ length: Math.floor(steps) + 1 }, (_, index) => {
        if (index > 0 && index === steps) {
            return end;
        }

        return start + toStep(index * step * direction, step);
    });
};

/**
 * Removes duplicate elements from an array.
 * @template T
 * @param {T[]} array The input array.
 * @returns {T[]} The de-duplicated array.
 */
export const unique = (array) =>
    Array.from(
        new Set(array),
    );

/**
 * Creates an array from a value, copying iterable and array-like objects.
 * @template T
 * @param {T|T[]|ArrayLike<T>|Iterable<T>|undefined} value The input value.
 * @returns {T[]} The wrapped array.
 */
export const wrap = (value) => {
    if (isUndefined(value)) {
        return [];
    }

    if (isArray(value)) {
        return value;
    }

    if (
        isObject(value) &&
        isFunction(value[Symbol.iterator])
    ) {
        return Array.from(value);
    }

    return isArrayLike(value) ?
        merge([], value) :
        [value];
};
