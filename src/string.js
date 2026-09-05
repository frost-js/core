import { randomInt } from './math.js';

// HTML escape characters
const escapeChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
};

const unescapeChars = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: '\'',
};

/**
 * String methods
 */

/**
 * Splits a string into individual words.
 * @param {string} string The input string.
 * @returns {string[]} The split parts of the string.
 */
const _splitString = (string) =>
    `${string}`
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .split(/[^a-zA-Z0-9']/)
        .reduce(
            (acc, word) => {
                word = word.replace(/[^\w]/g, '').toLowerCase();
                if (word) {
                    acc.push(word);
                }
                return acc;
            },
            [],
        );

/**
 * Converts a string to camelCase.
 * @param {string} string The input string.
 * @returns {string} The camelCased string.
 */
export const camelCase = (string) =>
    _splitString(string)
        .map(
            (word, index) =>
                index ?
                    capitalize(word) :
                    word,
        )
        .join('');

/**
 * Converts the first character of a string to upper case and the remaining to lower case.
 * @param {string} string The input string.
 * @returns {string} The capitalized string.
 */
export const capitalize = (string) =>
    string.charAt(0).toUpperCase() +
    string.substring(1).toLowerCase();

/**
 * Escapes HTML special characters in a string using HTML entities.
 * @param {string} string The input string.
 * @returns {string} The escaped string.
 */
export const escape = (string) =>
    string.replace(
        /[&<>"']/g,
        (match) =>
            escapeChars[match],
    );

/**
 * Escapes RegExp special characters in a string.
 * @param {string} string The input string.
 * @returns {string} The escaped string.
 */
export const escapeRegExp = (string) =>
    string.replace(
        /[-/\\^$*+?.()|[\]{}]/g,
        (match) => match === '-' ?
            '\\x2d' :
            `\\${match}`,
    );

/**
 * Converts a string to a humanized form.
 * @param {string} string The input string.
 * @returns {string} The humanized string.
 */
export const humanize = (string) =>
    capitalize(
        _splitString(string)
            .join(' '),
    );

/**
 * Converts a string to kebab-case.
 * @param {string} string The input string.
 * @returns {string} The kebab-cased string.
 */
export const kebabCase = (string) =>
    _splitString(string)
        .join('-');

/**
 * Converts a string to PascalCase.
 * @param {string} string The input string.
 * @returns {string} The PascalCased string.
 */
export const pascalCase = (string) =>
    _splitString(string)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.substring(1),
        )
        .join('');

/**
 * Creates a random string.
 * @param {number} [length=16] The number of characters in the output string.
 * @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789] The non-empty Unicode characters to generate the string from.
 * @throws {TypeError} If chars is empty.
 * @returns {string} The random string.
 */
export const randomString = (length = 16, chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') => {
    const characters = Array.from(chars);
    if (!characters.length) {
        throw new TypeError('chars must not be empty');
    }

    return new Array(length)
        .fill()
        .map(
            (_) =>
                characters[randomInt(characters.length)],
        )
        .join('');
};

/**
 * Converts a string to snake_case.
 * @param {string} string The input string.
 * @returns {string} The snake_cased string.
 */
export const snakeCase = (string) =>
    _splitString(string)
        .join('_');

/**
 * Unescapes HTML entities in a string into their corresponding characters.
 * @param {string} string The input string.
 * @returns {string} The unescaped string.
 */
export const unescape = (string) =>
    string.replace(
        /&(amp|lt|gt|quot|apos);/g,
        (_, code) =>
            unescapeChars[code],
    );
