import assert from 'node:assert/strict';
import { afterEach, describe, it, vi } from 'vitest';
import { camelCase, capitalize, escape, escapeRegExp, humanize, kebabCase, pascalCase, randomString, snakeCase, unescape } from '../../src/index.js';

describe('String', function() {
    afterEach(function() {
        vi.restoreAllMocks();
    });

    describe('#camelCase', function() {
        it.each([
            ['returns a camelized string', 'This is a sample string', 'thisIsASampleString'],
            ['works from upper case', 'HELLO WORLD', 'helloWorld'],
            ['separates acronyms from following words', 'XMLParser', 'xmlParser'],
            ['works from kebab-case', 'this-is-a-sample-string', 'thisIsASampleString'],
            ['works from PascalCase', 'ThisIsASampleString', 'thisIsASampleString'],
            ['works from snake_case', 'this_is_a_sample_string', 'thisIsASampleString'],
            ['strips invalid characters', 'This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?', 'thisIsASampleString'],
            ['strips multiple apostrophes', `rock'n'roll`, 'rocknroll'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                camelCase(input),
                expected,
            );
        });
    });

    describe('#capitalize', function() {
        it.each([
            ['returns a capitalized string', 'This is a sample string', 'This is a sample string'],
            ['works from lower case', 'this is a sample string', 'This is a sample string'],
            ['works from upper case', 'THIS IS A SAMPLE STRING', 'This is a sample string'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                capitalize(input),
                expected,
            );
        });
    });

    describe('#escape', function() {
        it.each([
            ['returns an escaped string', 'This is a sample string', 'This is a sample string'],
            ['escapes ampersand', '&', '&amp;'],
            ['escapes apostrophe', `'`, '&apos;'],
            ['escapes greater than', '>', '&gt;'],
            ['escapes less than', '<', '&lt;'],
            ['escapes quotation mark', '"', '&quot;'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                escape(input),
                expected,
            );
        });
    });

    describe('#escapeRegExp', function() {
        it.each([
            ['returns an escaped string', 'This is a sample string', 'This is a sample string'],
            ['escapes asterisk', '*', '\\*'],
            ['escapes backslash', '\\', '\\\\'],
            ['escapes caret', '^', '\\^'],
            ['escapes close curly brace', '}', '\\}'],
            ['escapes close parentheses', ')', '\\)'],
            ['escapes close square bracket', ']', '\\]'],
            ['escapes dollar sign', '$', '\\$'],
            ['escapes dot', '.', '\\.'],
            ['escapes forward slash', '/', '\\/'],
            ['escapes minus', '-', '\\x2d'],
            ['escapes open curly brace', '{', '\\{'],
            ['escapes open parentheses', '(', '\\('],
            ['escapes open square bracket', '[', '\\['],
            ['escapes plus', '+', '\\+'],
            ['escapes pipe', '|', '\\|'],
            ['escapes question mark', '?', '\\?'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                escapeRegExp(input),
                expected,
            );
        });

        it('produces escapes that compile in Unicode mode', function() {
            const escaped = escapeRegExp('a-b');

            assert.ok(new RegExp(escaped, 'u').test('a-b'));
        });
    });

    describe('#humanize', function() {
        it.each([
            ['returns a humanized string', 'This is a sample string', 'This is a sample string'],
            ['works from upper case', 'HELLO WORLD', 'Hello world'],
            ['works from camelCase', 'thisIsASampleString', 'This is a sample string'],
            ['works from kebab-case', 'this-is-a-sample-string', 'This is a sample string'],
            ['works from PascalCase', 'ThisIsASampleString', 'This is a sample string'],
            ['works from snake_case', 'this_is_a_sample_string', 'This is a sample string'],
            ['strips invalid characters', 'This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?', 'This is a sample string'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                humanize(input),
                expected,
            );
        });
    });

    describe('#kebabCase', function() {
        it.each([
            ['returns a kebab-case string', 'This is a sample string', 'this-is-a-sample-string'],
            ['works from upper case', 'HELLO WORLD', 'hello-world'],
            ['works from camelCase', 'thisIsASampleString', 'this-is-a-sample-string'],
            ['works from PascalCase', 'ThisIsASampleString', 'this-is-a-sample-string'],
            ['works from snake_case', 'this_is_a_sample_string', 'this-is-a-sample-string'],
            ['strips invalid characters', 'This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?', 'this-is-a-sample-string'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                kebabCase(input),
                expected,
            );
        });
    });

    describe('#pascalCase', function() {
        it.each([
            ['returns a pascalized string', 'This is a sample string', 'ThisIsASampleString'],
            ['works from upper case', 'HELLO WORLD', 'HelloWorld'],
            ['works from camelCase', 'thisIsASampleString', 'ThisIsASampleString'],
            ['works from kebab-case', 'this-is-a-sample-string', 'ThisIsASampleString'],
            ['works from snake_case', 'this_is_a_sample_string', 'ThisIsASampleString'],
            ['strips invalid characters', 'This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?', 'ThisIsASampleString'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                pascalCase(input),
                expected,
            );
        });
    });

    describe('#randomString', function() {
        it.each([
            ['uses the default length and first character', [], 0, 'a'.repeat(16)],
            ['can select the last default character', [], 1 - Number.EPSILON, '9'.repeat(16)],
            ['works with a custom length', [24], 0.5, 'F'.repeat(24)],
            ['works with custom characters', [8, '0123456789'], 0.75, '77777777'],
            ['selects complete Unicode code points', [4, '😀'], 0.5, '😀😀😀😀'],
        ])('%s', function(_, args, sample, expected) {
            vi.spyOn(Math, 'random').mockReturnValue(sample);

            assert.strictEqual(randomString(...args), expected);
        });

        it('selects each character independently', function() {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(1 - Number.EPSILON);

            assert.strictEqual(randomString(3, 'abc'), 'abc');
        });

        it('rejects an empty character set', function() {
            assert.throws(
                (_) => randomString(4, ''),
                TypeError,
            );
        });
    });

    describe('#snakeCase', function() {
        it.each([
            ['returns a snake_cased string', 'This is a sample string', 'this_is_a_sample_string'],
            ['works from upper case', 'HELLO WORLD', 'hello_world'],
            ['works from camelCase', 'thisIsASampleString', 'this_is_a_sample_string'],
            ['works from PascalCase', 'ThisIsASampleString', 'this_is_a_sample_string'],
            ['works from kebab-case', 'this-is-a-sample-string', 'this_is_a_sample_string'],
            ['strips invalid characters', 'This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?', 'this_is_a_sample_string'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                snakeCase(input),
                expected,
            );
        });
    });

    describe('#unescape', function() {
        it.each([
            ['returns an unescaped string', 'This is a sample string', 'This is a sample string'],
            ['unescapes ampersand', '&amp;', '&'],
            ['unescapes apostrophe', '&apos;', `'`],
            ['unescapes greater than', '&gt;', '>'],
            ['unescapes less than', '&lt;', '<'],
            ['unescapes quotation mark', '&quot;', '"'],
        ])('%s', function(_, input, expected) {
            assert.strictEqual(
                unescape(input),
                expected,
            );
        });
    });
});
