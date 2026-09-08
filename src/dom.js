/**
 * DOM methods
 */

/**
 * Calls a DOM method without named-property collisions, preserving the receiver.
 * @param {*} node The node or ordinary value.
 * @param {string|symbol} method The method to call.
 * @param {...*} args The arguments to pass.
 * @returns {*} The method's return value.
 */
export const callDOMMethod = (node, method, ...args) =>
    Reflect.apply(getDOMProperty(node, method), node, args);

/**
 * Reads a DOM prototype property without named-property collisions, or an ordinary property for non-DOM values.
 * @param {*} node The node or ordinary value.
 * @param {string|symbol} property The property to read.
 * @returns {*} The property value.
 */
export const getDOMProperty = (node, property) => {
    const prototype = Object.getPrototypeOf(node);
    return prototype && 'nodeType' in prototype ?
        Reflect.get(prototype, property, node) :
        node[property];
};
