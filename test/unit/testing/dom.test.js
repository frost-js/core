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
            ['works with document', new MockDocument, false],
            ['works with element', new MockElement, true],
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
            ['works with function', mockFunction, false],
            ['works with NaN', NaN, false],
            ['works with null', null, false],
            ['works with number', mockNumber, false],
            ['works with numeric string', mockNumericString, false],
            ['works with object', new MockObject, false],
            ['works with plain object', mockPlainObject, false],
            ['works with shadow', new MockShadow, true],
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
    });
});
