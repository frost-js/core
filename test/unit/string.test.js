import assert from 'node:assert/strict';
import { describe, it } from 'mocha';
import { camelCase, capitalize, escape, escapeRegExp, humanize, kebabCase, pascalCase, randomString, snakeCase, unescape } from '../../src/index.js';

describe('String', function() {
    describe('#camelCase', function() {
        it('returns a camelized string', function() {
            assert.strictEqual(
                camelCase('This is a sample string'),
                'thisIsASampleString',
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                camelCase('this-is-a-sample-string'),
                'thisIsASampleString',
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                camelCase('ThisIsASampleString'),
                'thisIsASampleString',
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                camelCase('this_is_a_sample_string'),
                'thisIsASampleString',
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                camelCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'thisIsASampleString',
            );
        });

        it('strips multiple apostrophes', function() {
            assert.strictEqual(
                camelCase(`rock'n'roll`),
                'rocknroll',
            );
        });
    });

    describe('#capitalize', function() {
        it('returns a capitalized string', function() {
            assert.strictEqual(
                capitalize('This is a sample string'),
                'This is a sample string',
            );
        });

        it('works from lower case', function() {
            assert.strictEqual(
                capitalize('this is a sample string'),
                'This is a sample string',
            );
        });

        it('works from upper case', function() {
            assert.strictEqual(
                capitalize('THIS IS A SAMPLE STRING'),
                'This is a sample string',
            );
        });
    });

    describe('#escape', function() {
        it('returns an escaped string', function() {
            assert.strictEqual(
                escape('This is a sample string'),
                'This is a sample string',
            );
        });

        it('escapes ampersand', function() {
            assert.strictEqual(
                escape('&'),
                '&amp;',
            );
        });

        it('escapes apostrophe', function() {
            assert.strictEqual(
                escape(`'`),
                '&apos;',
            );
        });

        it('escapes greater than', function() {
            assert.strictEqual(
                escape('>'),
                '&gt;',
            );
        });

        it('escapes less than', function() {
            assert.strictEqual(
                escape('<'),
                '&lt;',
            );
        });

        it('escapes quotation mark', function() {
            assert.strictEqual(
                escape('"'),
                '&quot;',
            );
        });
    });

    describe('#escapeRegExp', function() {
        it('returns an escaped string', function() {
            assert.strictEqual(
                escapeRegExp('This is a sample string'),
                'This is a sample string',
            );
        });

        it('escapes asterisk', function() {
            assert.strictEqual(
                escapeRegExp('*'),
                '\\*',
            );
        });

        it('escapes backlash', function() {
            assert.strictEqual(
                escapeRegExp('\\'),
                '\\\\',
            );
        });

        it('escapes caret', function() {
            assert.strictEqual(
                escapeRegExp('^'),
                '\\^',
            );
        });

        it('escapes close curly brace', function() {
            assert.strictEqual(
                escapeRegExp('}'),
                '\\}',
            );
        });

        it('escapes close parentheses', function() {
            assert.strictEqual(
                escapeRegExp(')'),
                '\\)',
            );
        });

        it('escapes close square bracket', function() {
            assert.strictEqual(
                escapeRegExp(']'),
                '\\]',
            );
        });

        it('escapes dollar sign', function() {
            assert.strictEqual(
                escapeRegExp('$'),
                '\\$',
            );
        });

        it('escapes dot', function() {
            assert.strictEqual(
                escapeRegExp('.'),
                '\\.',
            );
        });

        it('escapes forward slash', function() {
            assert.strictEqual(
                escapeRegExp('/'),
                '\\/',
            );
        });

        it('escapes minus', function() {
            assert.strictEqual(
                escapeRegExp('-'),
                '\\x2d',
            );
        });

        it('produces escapes that compile in Unicode mode', function() {
            const escaped = escapeRegExp('a-b');

            assert.ok(new RegExp(escaped, 'u').test('a-b'));
        });

        it('escapes open curly brace', function() {
            assert.strictEqual(
                escapeRegExp('{'),
                '\\{',
            );
        });

        it('escapes open parentheses', function() {
            assert.strictEqual(
                escapeRegExp('('),
                '\\(',
            );
        });

        it('escapes open square bracket', function() {
            assert.strictEqual(
                escapeRegExp('['),
                '\\[',
            );
        });

        it('escapes plus', function() {
            assert.strictEqual(
                escapeRegExp('+'),
                '\\+',
            );
        });

        it('escapes pipe', function() {
            assert.strictEqual(
                escapeRegExp('|'),
                '\\|',
            );
        });

        it('escapes question mark', function() {
            assert.strictEqual(
                escapeRegExp('?'),
                '\\?',
            );
        });
    });

    describe('#humanize', function() {
        it('returns a humanized string', function() {
            assert.strictEqual(
                humanize('This is a sample string'),
                'This is a sample string',
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                humanize('thisIsASampleString'),
                'This is a sample string',
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                humanize('this-is-a-sample-string'),
                'This is a sample string',
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                humanize('ThisIsASampleString'),
                'This is a sample string',
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                humanize('this_is_a_sample_string'),
                'This is a sample string',
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                humanize('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'This is a sample string',
            );
        });
    });

    describe('#kebabCase', function() {
        it('returns a kebab-case string', function() {
            assert.strictEqual(
                kebabCase('This is a sample string'),
                'this-is-a-sample-string',
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                kebabCase('thisIsASampleString'),
                'this-is-a-sample-string',
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                'this-is-a-sample-string',
                kebabCase('ThisIsASampleString'),
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                kebabCase('this_is_a_sample_string'),
                'this-is-a-sample-string',
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                kebabCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this-is-a-sample-string',
            );
        });
    });

    describe('#pascalCase', function() {
        it('returns a pascalized string', function() {
            assert.strictEqual(
                pascalCase('This is a sample string'),
                'ThisIsASampleString',
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                pascalCase('thisIsASampleString'),
                'ThisIsASampleString',
            );
        });

        it('works from kebab-case', function() {
            assert.strictEqual(
                pascalCase('this-is-a-sample-string'),
                'ThisIsASampleString',
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                pascalCase('this_is_a_sample_string'),
                'ThisIsASampleString',
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                pascalCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'ThisIsASampleString',
            );
        });
    });

    describe('#randomString', function() {
        it('returns a random string', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomString();
                assert.ok(/[0-9a-zA-Z]{16}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with a custom length', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomString(24);
                assert.ok(/[0-9a-zA-Z]{24}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('works with custom characters', function() {
            const found = new Set;

            let i;
            for (i = 0; i < 1000; i++) {
                const value = randomString(8, '0123456789');
                assert.ok(/[0-9]{8}/.test(value));
                found.add(value);
            }

            assert.ok(found.size > 100);
        });

        it('selects complete Unicode code points', function() {
            assert.strictEqual(
                randomString(4, '😀'),
                '😀😀😀😀',
            );
        });

        it('rejects an empty character set', function() {
            assert.throws(
                (_) => randomString(4, ''),
                TypeError,
            );
        });
    });

    describe('#snakeCase', function() {
        it('returns an snake_cased string', function() {
            assert.strictEqual(
                snakeCase('This is a sample string'),
                'this_is_a_sample_string',
            );
        });

        it('works from camelCase', function() {
            assert.strictEqual(
                snakeCase('thisIsASampleString'),
                'this_is_a_sample_string',
            );
        });

        it('works from PascalCase', function() {
            assert.strictEqual(
                snakeCase('ThisIsASampleString'),
                'this_is_a_sample_string',
            );
        });

        it('works from snake_case', function() {
            assert.strictEqual(
                snakeCase('this-is-a-sample-string'),
                'this_is_a_sample_string',
            );
        });

        it('strips invalid characters', function() {
            assert.strictEqual(
                snakeCase('This is a sample string!@#$%^&*()_+`-=[]{}|\\;,.<>/?'),
                'this_is_a_sample_string',
            );
        });
    });

    describe('#unescape', function() {
        it('returns an unescaped string', function() {
            assert.strictEqual(
                unescape('This is a sample string'),
                'This is a sample string',
            );
        });

        it('unescapes ampersand', function() {
            assert.strictEqual(
                unescape('&amp;'),
                '&',
            );
        });

        it('unescapes apostrophe', function() {
            assert.strictEqual(
                unescape('&apos;'),
                `'`,
            );
        });

        it('unescapes greater than', function() {
            assert.strictEqual(
                unescape('&gt;'),
                '>',
            );
        });

        it('unescapes less than', function() {
            assert.strictEqual(
                unescape('&lt;'),
                '<',
            );
        });

        it('unescapes quotation mark', function() {
            assert.strictEqual(
                unescape('&quot;'),
                '"',
            );
        });
    });
});
