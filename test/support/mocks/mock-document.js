/**
 * MockDocument class
 * @class
 */
export default class MockDocument {
    /**
     * Creates a MockDocument.
     * @param {MockWindow} window The MockWindow.
     */
    constructor(window = null) {
        this.nodeType = 9;
        this.defaultView = window;
    }
}
