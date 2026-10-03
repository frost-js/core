import MockElement from './mock-element.js';

/**
 * MockShadow class
 * @class
 */
export default class MockShadow {
    /**
     * Creates a MockShadow.
     */
    constructor() {
        this.nodeType = 11;
        this.host = new MockElement();
    }
}
