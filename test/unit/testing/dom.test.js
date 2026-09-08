import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { isDocument, isElement, isFragment, isNode, isShadow, isText, isWindow } from '../../../src/index.js';
import { mockArray, mockFunction, mockNumber, mockNumericString, mockPlainObject, mockString } from '../../support/fixtures.js';
import MockArrayLike from '../../support/mocks/mock-array-like.js';
import MockCommentNode from '../../support/mocks/mock-comment-node.js';
import MockDocument from '../../support/mocks/mock-document.js';
import MockElement from '../../support/mocks/mock-element.js';
import MockFragment from '../../support/mocks/mock-fragment.js';
import MockObject from '../../support/mocks/mock-object.js';
import MockShadow from '../../support/mocks/mock-shadow.js';
import MockTextNode from '../../support/mocks/mock-text-node.js';
import MockWindow from '../../support/mocks/mock-window.js';

describe('Testing (DOM)', function() {
    describe('#isDocument', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, true],
            ['works with document and shadowed nodeType', Object.assign(Object.create({ nodeType: 9 }), { nodeType: new MockElement }), true],
            ['works with element', new MockElement, false],
            ['works with fragment', new MockFragment, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, false],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isDocument(input),
                expected,
            );
        });
    });

    describe('#isElement', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, true],
            ['works with element and shadowed nodeType', Object.assign(Object.create({ nodeType: 1 }), { nodeType: new MockElement }), true],
            ['works with fragment', new MockFragment, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, false],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isElement(input),
                expected,
            );
        });
    });

    describe('#isFragment', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, false],
            ['works with fragment', new MockFragment, true],
            ['works with fragment and shadowed nodeType', Object.assign(Object.create({ nodeType: 11 }), { nodeType: new MockElement, host: null }), true],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with shadow and shadowed nodeType', Object.assign(Object.create({ nodeType: 11 }), { nodeType: new MockElement, host: new MockElement }), false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, false],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isFragment(input),
                expected,
            );
        });
    });

    describe('#isNode', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, true],
            ['works with comment node and shadowed nodeType', Object.assign(Object.create({ nodeType: 8 }), { nodeType: new MockElement }), true],
            ['works with document', new MockDocument, false],
            ['works with document and shadowed nodeType', Object.assign(Object.create({ nodeType: 9 }), { nodeType: new MockElement }), false],
            ['works with element', new MockElement, true],
            ['works with element and shadowed nodeType', Object.assign(Object.create({ nodeType: 1 }), { nodeType: new MockElement }), true],
            ['works with fragment', new MockFragment, false],
            ['works with fragment and shadowed nodeType', Object.assign(Object.create({ nodeType: 11 }), { nodeType: new MockElement, host: null }), false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, true],
            ['works with text node and shadowed nodeType', Object.assign(Object.create({ nodeType: 3 }), { nodeType: new MockElement }), true],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isNode(input),
                expected,
            );
        });
    });

    describe('#isShadow', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, false],
            ['works with fragment', new MockFragment, false],
            ['works with fragment and shadowed nodeType', Object.assign(Object.create({ nodeType: 11 }), { nodeType: new MockElement, host: null }), false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, true],
            ['works with shadow and shadowed nodeType', Object.assign(Object.create({ nodeType: 11 }), { nodeType: new MockElement, host: new MockElement }), true],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, false],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isShadow(input),
                expected,
            );
        });
    });

    describe('#isText', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, false],
            ['works with fragment', new MockFragment, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, true],
            ['works with text node and shadowed nodeType', Object.assign(Object.create({ nodeType: 3 }), { nodeType: new MockElement }), true],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, false],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isText(input),
                expected,
            );
        });
    });

    describe('#isWindow', function() {
        it.each([
            ['works with array', mockArray, false],
            ['works with array-like', new MockArrayLike, false],
            ['works with boolean true', true, false],
            ['works with boolean false', false, false],
            ['works with comment node', new MockCommentNode, false],
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, false],
            ['works with fragment', new MockFragment, false],
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, false],
            ['works with string', mockString, false],
            ['works with text node', new MockTextNode, false],
            ['works with undefined', undefined, false],
            ['works with window', new MockWindow, true],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                isWindow(input),
                expected,
            );
        });

        it('recognizes a window with a shadowed document defaultView', function() {
            const view = {};
            view.document = Object.create({
                nodeType: 9,
                get defaultView() {
                    assert.strictEqual(this, view.document);
                    return view;
                },
            }, {
                defaultView: { value: new MockElement },
            });

            assert.strictEqual(isWindow(view), true);
            assert.strictEqual(isWindow({ document: view.document }), false);
        });

        it.each([
            ['plain document', { nodeType: 9 }],
            ['null-prototype document', Object.assign(Object.create(null), { nodeType: 9 })],
        ])('preserves %s stand-ins', function(_, document) {
            const view = { document };
            document.defaultView = view;

            assert.strictEqual(isDocument(document), true);
            assert.strictEqual(isWindow(view), true);
        });
    });
});
