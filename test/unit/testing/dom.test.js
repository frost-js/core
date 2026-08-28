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
        it('works with array', function() {
            assert.strictEqual(
                isDocument(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isDocument(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isDocument(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isDocument(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isDocument(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isDocument(new MockDocument),
                true,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isDocument(new MockElement),
                false,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isDocument(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isDocument(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isDocument(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isDocument(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isDocument(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isDocument(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isDocument(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isDocument(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isDocument(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isDocument(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isDocument(new MockTextNode),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isDocument(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isDocument(new MockWindow),
                false,
            );
        });
    });

    describe('#isElement', function() {
        it('works with array', function() {
            assert.strictEqual(
                isElement(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isElement(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isElement(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isElement(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isElement(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isElement(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isElement(new MockElement),
                true,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isElement(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isElement(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isElement(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isElement(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isElement(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isElement(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isElement(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isElement(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isElement(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isElement(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isElement(new MockTextNode),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isElement(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isElement(new MockWindow),
                false,
            );
        });
    });

    describe('#isFragment', function() {
        it('works with array', function() {
            assert.strictEqual(
                isFragment(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isFragment(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isFragment(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isFragment(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isFragment(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isFragment(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isFragment(new MockElement),
                false,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isFragment(new MockFragment),
                true,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isFragment(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isFragment(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isFragment(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isFragment(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isFragment(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isFragment(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isFragment(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isFragment(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isFragment(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isFragment(new MockTextNode),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isFragment(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isFragment(new MockWindow),
                false,
            );
        });
    });

    describe('#isNode', function() {
        it('works with array', function() {
            assert.strictEqual(
                isNode(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isNode(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isNode(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isNode(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isNode(new MockCommentNode),
                true,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isNode(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isNode(new MockElement),
                true,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isNode(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isNode(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isNode(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isNode(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isNode(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isNode(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isNode(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isNode(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isNode(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isNode(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isNode(new MockTextNode),
                true,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isNode(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isNode(new MockWindow),
                false,
            );
        });
    });

    describe('#isShadow', function() {
        it('works with array', function() {
            assert.strictEqual(
                isShadow(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isShadow(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isShadow(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isShadow(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isShadow(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isShadow(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isShadow(new MockElement),
                false,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isShadow(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isShadow(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isShadow(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isShadow(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isShadow(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isShadow(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isShadow(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isShadow(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isShadow(new MockShadow),
                true,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isShadow(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isShadow(new MockTextNode),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isShadow(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isShadow(new MockWindow),
                false,
            );
        });
    });

    describe('#isText', function() {
        it('works with array', function() {
            assert.strictEqual(
                isText(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isText(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isText(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isText(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isText(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isText(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isText(new MockElement),
                false,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isText(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isText(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isText(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isText(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isText(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isText(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isText(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isText(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isText(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isText(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isText(new MockTextNode),
                true,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isText(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isText(new MockWindow),
                false,
            );
        });
    });

    describe('#isWindow', function() {
        it('works with array', function() {
            assert.strictEqual(
                isWindow(mockArray),
                false,
            );
        });

        it('works with array-like', function() {
            assert.strictEqual(
                isWindow(new MockArrayLike),
                false,
            );
        });

        it('works with boolean true', function() {
            assert.strictEqual(
                isWindow(true),
                false,
            );
        });

        it('works with boolean false', function() {
            assert.strictEqual(
                isWindow(false),
                false,
            );
        });

        it('works with comment node', function() {
            assert.strictEqual(
                isWindow(new MockCommentNode),
                false,
            );
        });

        it('works with document', function() {
            assert.strictEqual(
                isWindow(new MockDocument),
                false,
            );
        });

        it('works with element', function() {
            assert.strictEqual(
                isWindow(new MockElement),
                false,
            );
        });

        it('works with fragment', function() {
            assert.strictEqual(
                isWindow(new MockFragment),
                false,
            );
        });

        it('works with function', function() {
            assert.strictEqual(
                isWindow(mockFunction),
                false,
            );
        });

        it('works with NaN', function() {
            assert.strictEqual(
                isWindow(NaN),
                false,
            );
        });

        it('works with null', function() {
            assert.strictEqual(
                isWindow(null),
                false,
            );
        });

        it('works with number', function() {
            assert.strictEqual(
                isWindow(mockNumber),
                false,
            );
        });

        it('works with numeric string', function() {
            assert.strictEqual(
                isWindow(mockNumericString),
                false,
            );
        });

        it('works with object', function() {
            assert.strictEqual(
                isWindow(new MockObject),
                false,
            );
        });

        it('works with plain object', function() {
            assert.strictEqual(
                isWindow(mockPlainObject),
                false,
            );
        });

        it('works with shadow', function() {
            assert.strictEqual(
                isWindow(new MockShadow),
                false,
            );
        });

        it('works with string', function() {
            assert.strictEqual(
                isWindow(mockString),
                false,
            );
        });

        it('works with text node', function() {
            assert.strictEqual(
                isWindow(new MockTextNode),
                false,
            );
        });

        it('works with undefined', function() {
            assert.strictEqual(
                isWindow(undefined),
                false,
            );
        });

        it('works with window', function() {
            assert.strictEqual(
                isWindow(new MockWindow),
                true,
            );
        });
    });
});
