import { getDomProperty } from './dom.js';

/**
 * Testing methods
 */

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;

/**
 * Reads a node type without named-property collisions.
 * @param {*} value The value to read.
 * @returns {*} The node type, or the input if falsy.
 */
const getNodeType = (value) =>
    value && getDomProperty(value, 'nodeType');

/**
 * Checks whether a value is an array.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is an array.
 */
export const isArray = Array.isArray;

/**
 * Checks whether a value is array-like.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is array-like.
 */
export const isArrayLike = (value) => {
    if (isArray(value)) {
        return true;
    }

    if (!isObject(value) || isFunction(value) || isWindow(value) || isElement(value)) {
        return false;
    }

    if (isFunction(value[Symbol.iterator])) {
        return true;
    }

    const length = value.length;
    return isNumeric(length) && (!length || length - 1 in value);
};

/**
 * Checks whether a value is a boolean.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a boolean.
 */
export const isBoolean = (value) =>
    typeof value === 'boolean';

/**
 * Checks whether a value is a Document.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a Document.
 */
export const isDocument = (value) =>
    getNodeType(value) === DOCUMENT_NODE;

/**
 * Checks whether a value is an Element.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is an Element.
 */
export const isElement = (value) =>
    getNodeType(value) === ELEMENT_NODE;

/**
 * Checks whether a value is a DocumentFragment (and not a ShadowRoot).
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a DocumentFragment.
 */
export const isFragment = (value) =>
    getNodeType(value) === DOCUMENT_FRAGMENT_NODE &&
    !value.host;

/**
 * Checks whether a value is a function.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a function.
 */
export const isFunction = (value) =>
    typeof value === 'function';

/**
 * Checks whether a value is NaN.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is NaN.
 */
export const isNaN = Number.isNaN;

/**
 * Checks whether a value is an Element, Text node, or Comment node.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is an Element, Text node, or Comment node.
 */
export const isNode = (value) => {
    const nodeType = getNodeType(value);
    return nodeType === ELEMENT_NODE ||
        nodeType === TEXT_NODE ||
        nodeType === COMMENT_NODE;
};

/**
 * Checks whether a value is null.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is null.
 */
export const isNull = (value) =>
    value === null;

/**
 * Checks whether a value is numeric.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is numeric.
 */
export const isNumeric = (value) => {
    try {
        return !isNaN(parseFloat(value)) && isFinite(value);
    } catch {
        return false;
    }
};

/**
 * Checks whether a value is an object-like reference, including arrays and functions.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is an object-like reference.
 */
export const isObject = (value) =>
    !!value &&
    value === Object(value);

/**
 * Checks whether a value is a plain object.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a plain object.
 */
export const isPlainObject = (value) => {
    if (!isObject(value)) {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === null ||
        Object.getPrototypeOf(prototype) === null;
};

/**
 * Checks whether a value is a ShadowRoot.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a ShadowRoot.
 */
export const isShadow = (value) =>
    getNodeType(value) === DOCUMENT_FRAGMENT_NODE &&
    !!value.host;

/**
 * Checks whether a value is a string.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a string.
 */
export const isString = (value) =>
    typeof value === 'string';

/**
 * Checks whether a value is a text Node.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a text Node.
 */
export const isText = (value) =>
    getNodeType(value) === TEXT_NODE;

/**
 * Checks whether a value is undefined.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is undefined.
 */
export const isUndefined = (value) =>
    value === undefined;

/**
 * Checks whether a value is a Window.
 * @param {*} value The value to test.
 * @returns {boolean} Whether the value is a Window.
 */
export const isWindow = (value) =>
    !!value &&
    !!value.document &&
    getDomProperty(value.document, 'defaultView') === value;
