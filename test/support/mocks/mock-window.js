import MockDocument from './mock-document.js';

/**
 * MockWindow class
 * @class
 */
export default class MockWindow {
    /**
     * Creates a MockWindow.
     */
    constructor() {
        this.document = new MockDocument(this);
    }
}
