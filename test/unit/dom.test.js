import assert from 'node:assert/strict';
import { describe, it } from 'vitest';
import { callDOMMethod, getDOMProperty } from '../../src/index.js';
import MockElement from '../support/mocks/mock-element.js';

describe('DOM', function() {
    describe('#callDOMMethod', function() {
        it('calls a shadowed method with the node as the getter and method receiver', function() {
            const expected = {};
            const node = Object.create({
                nodeType: 1,
                get matches() {
                    assert.strictEqual(this, node);
                    return function(...args) {
                        assert.strictEqual(this, node);
                        assert.deepStrictEqual(args, ['form', true]);
                        return expected;
                    };
                },
            }, {
                matches: { value: new MockElement },
            });

            assert.strictEqual(callDOMMethod(node, 'matches', 'form', true), expected);
        });

        it.each([
            ['ordinary object', Object.prototype],
            ['null-prototype object', null],
        ])('preserves own methods and receivers for an %s', function(_, prototype) {
            const node = Object.assign(Object.create(prototype), {
                value: 2,
                multiply(amount) {
                    assert.strictEqual(this, node);
                    return this.value * amount;
                },
            });

            assert.strictEqual(callDOMMethod(node, 'multiply', 3), 6);
        });

        it('does not call an own method missing from the DOM prototype', function() {
            const node = Object.create({ nodeType: 1 }, {
                matches: { value: () => true },
            });

            assert.throws(() => callDOMMethod(node, 'matches'), TypeError);
        });
    });

    describe('#getDOMProperty', function() {
        it.each([
            ['nodeType', 1],
            ['style', { color: 'red' }],
            ['dataset', { name: 'test' }],
        ])('reads shadowed %s with the node as the getter receiver', function(property, expected) {
            const control = new MockElement;
            const prototype = Object.create({ nodeType: 1 }, {
                [property]: {
                    get() {
                        assert.strictEqual(this, node);
                        return expected;
                    },
                },
            });
            const node = Object.create(prototype, {
                [property]: { value: control },
            });

            assert.strictEqual(node[property], control);
            assert.strictEqual(getDOMProperty(node, property), expected);
        });

        it.each([
            ['missing', { nodeType: 1 }],
            ['undefined', { nodeType: 1, style: undefined }],
        ])('does not fall back to an own property when the prototype property is %s', function(_, prototype) {
            const node = Object.create(prototype, {
                style: { value: new MockElement },
            });

            assert.strictEqual(getDOMProperty(node, 'style'), undefined);
        });

        it.each([
            ['plain document', { nodeType: 9, defaultView: null }, 'defaultView', null],
            ['null-prototype object', Object.assign(Object.create(null), { nodeType: 1 }), 'nodeType', 1],
            ['inherited property', Object.create({ value: 1 }), 'value', 1],
            ['own property', Object.assign(Object.create({ value: 1 }), { value: 2 }), 'value', 2],
            ['string', 'form', 'length', 4],
            ['number', 42, 'nodeType', undefined],
            ['boolean', true, 'nodeType', undefined],
            ['symbol', Symbol('test'), 'nodeType', undefined],
            ['bigint', 1n, 'nodeType', undefined],
        ])('preserves ordinary access for %s', function(_, input, property, expected) {
            assert.strictEqual(getDOMProperty(input, property), expected);
        });
    });
});
