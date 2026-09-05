import { isArray, isObject, isPlainObject } from './testing.js';

/**
 * Object methods
 */

const hasOwn = (object, key) =>
    Object.prototype.hasOwnProperty.call(object, key);

const assignOwn = (object, key, value) => {
    if (hasOwn(object, key)) {
        object[key] = value;
        return;
    }

    Object.defineProperty(
        object,
        key,
        {
            configurable: true,
            enumerable: true,
            value,
            writable: true,
        },
    );
};

const setDotSegments = (object, keys, value, overwrite) => {
    const [key, ...remainingKeys] = keys;
    if (!key) {
        return;
    }

    if (key === '*') {
        for (const childKey of Object.keys(object)) {
            if (!remainingKeys.length) {
                if (overwrite) {
                    assignOwn(object, childKey, value);
                }
                continue;
            }

            let child = object[childKey];
            if (!isObject(child)) {
                if (!overwrite) {
                    continue;
                }

                child = {};
                assignOwn(object, childKey, child);
            }

            setDotSegments(child, remainingKeys, value, overwrite);
        }
        return;
    }

    if (remainingKeys.length) {
        let child = hasOwn(object, key) ?
            object[key] :
            undefined;

        if (!isObject(child)) {
            if (
                hasOwn(object, key) &&
                !overwrite
            ) {
                return;
            }

            child = {};
            assignOwn(object, key, child);
        }

        setDotSegments(child, remainingKeys, value, overwrite);
    } else if (
        overwrite ||
        !hasOwn(object, key)
    ) {
        assignOwn(object, key, value);
    }
};

/**
 * Merges values from one or more objects into an object (recursively).
 * @param {object} object The input object.
 * @param {...object} objects The objects to merge.
 * @returns {object} The extended object.
 */
export const extend = (object, ...objects) => {
    for (const source of objects) {
        if (source == null) {
            continue;
        }

        for (const key of Object.keys(source)) {
            let value = source[key];
            const currentValue = hasOwn(object, key) ? object[key] : undefined;

            if (isArray(value)) {
                const target = isArray(currentValue) ? currentValue : [];
                target.length = Math.max(target.length, value.length);
                value = extend(target, value);
            } else if (isPlainObject(value)) {
                const target = isPlainObject(currentValue) ? currentValue : {};
                value = extend(target, value);
            }

            assignOwn(object, key, value);
        }
    }

    return object;
};

/**
 * Flattens an object using dot notation while preserving empty plain objects.
 * @param {object} object The input object.
 * @param {string} [prefix] The key prefix.
 * @returns {object} The flattened object.
 */
export const flatten = (object, prefix = '') =>
    Object.keys(object).reduce((acc, key) => {
        const prefixedKey = `${prefix}${key}`;
        if (
            isPlainObject(object[key]) &&
            Object.keys(object[key]).length
        ) {
            const flattened = flatten(object[key], `${prefixedKey}.`);
            for (const flattenedKey of Object.keys(flattened)) {
                assignOwn(acc, flattenedKey, flattened[flattenedKey]);
            }
        } else {
            assignOwn(acc, prefixedKey, object[key]);
        }

        return acc;
    }, {});

/**
 * Removes a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to remove from the object.
 * @returns {void} Nothing.
 */
export const forgetDot = (object, key) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !hasOwn(object, key)
        ) {
            break;
        }

        if (keys.length) {
            object = object[key];
        } else {
            delete object[key];
        }
    }
};

/**
 * Retrieves an own value of a specified key from an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to retrieve from the object.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {*} The value retrieved from the object.
 */
export const getDot = (object, key, defaultValue) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !hasOwn(object, key)
        ) {
            return defaultValue;
        }

        object = object[key];
    }

    return object;
};

/**
 * Checks whether a specified own key exists in an object using dot notation.
 * @param {object} object The input object.
 * @param {string} key The key to test for in the object.
 * @returns {boolean} Whether the key exists.
 */
export const hasDot = (object, key) => {
    const keys = key.split('.');
    while ((key = keys.shift())) {
        if (
            !isObject(object) ||
            !hasOwn(object, key)
        ) {
            return false;
        }

        object = object[key];
    }

    return true;
};

/**
 * Retrieves values of a specified key from an array of objects using dot notation.
 * @param {object[]} objects The input objects.
 * @param {string} key The key to retrieve from the objects.
 * @param {*} [defaultValue] The default value if key does not exist.
 * @returns {Array<*>} An array of values retrieved from the objects.
 */
export const pluckDot = (objects, key, defaultValue) =>
    objects
        .map((pointer) =>
            getDot(pointer, key, defaultValue),
        );

/**
 * Sets a specified value of a key for an object using dot notation, including wildcard segments.
 * @param {object} object The input object.
 * @param {string} key The key to set in the object.
 * @param {*} value The value to set.
 * @param {{overwrite?: boolean}} [options] Options for setting the value.
 * @param {boolean} [options.overwrite=true] Whether to overwrite the value if the key already exists.
 * @returns {void} Nothing.
 */
export const setDot = (object, key, value, { overwrite = true } = {}) =>
    setDotSegments(object, key.split('.'), value, overwrite);
