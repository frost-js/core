import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { animation, compose, curry, debounce, evaluate, once, partial, pipe, throttle, times } from '../../src/index.js';

describe('Function', function() {
    beforeEach(function() {
        vi.useFakeTimers();
    });

    afterEach(function() {
        vi.useRealTimers();
    });

    describe('#animation', function() {
        it('returns an animation function', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated();
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('only executes once per animation frame', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated();
            animated();
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('executes for each animation frame', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated('first');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            animated('second');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['second']]);
        });

        it('works without leading argument', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated();
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('works with leading argument', function() {
            const callback = vi.fn();
            const animated = animation(callback, { leading: true });

            animated('first');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            animated('ignored');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            animated('next');
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['next']]);
        });

        it('uses the most recent arguments', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated('first', 1);
            animated('last', 2);
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [['last', 2]]);
        });

        it('uses the most recent context', function() {
            const callback = vi.fn();
            const animated = animation(callback);
            const expected = {};

            animated.call({});
            animated.call(expected);
            vi.advanceTimersByTime(32);

            assert.strictEqual(callback.mock.calls.length, 1);
            assert.strictEqual(callback.mock.contexts[0], expected);
        });

        it('allows callback to be cancelled', function() {
            const callback = vi.fn();
            const animated = animation(callback);

            animated();
            animated.cancel();
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, []);
        });
    });

    describe('#compose', function() {
        it('returns a composed function', function() {
            assert.strictEqual(
                compose(
                    (x) => x / 2,
                    (x) => x + 2,
                    (x) => x * 3,
                )(5),
                8.5,
            );
        });

        it('preserves context', function() {
            const callback = compose(function(value) {
                return this.amount + value;
            });

            assert.strictEqual(callback.call({ amount: 2 }, 3), 5);
        });
    });

    describe('#curry', function() {
        it('returns a curried function', function() {
            assert.strictEqual(
                curry(
                    (a, b) =>
                        a * b,
                )(2)(5),
                10,
            );
        });

        it('preserves context from the first call', function() {
            const callback = curry(function(a, b) {
                return this.amount + a + b;
            });

            assert.strictEqual(callback.call({ amount: 1 }, 2)(3), 6);
        });
    });

    describe('#debounce', function() {
        it('returns a debounced function', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32);

            debounced();
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('only executes once per wait period', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32);

            debounced();
            debounced();
            vi.advanceTimersByTime(64);

            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('executes for each wait period', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 16);

            debounced('first');
            vi.advanceTimersByTime(16);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            debounced('second');
            vi.advanceTimersByTime(16);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['second']]);
        });

        it('only executes after wait period', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 16);

            debounced('first');
            vi.advanceTimersByTime(8);
            debounced('second');
            vi.advanceTimersByTime(8);
            debounced('last');

            vi.advanceTimersByTime(15);
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(1);
            assert.deepStrictEqual(callback.mock.calls, [['last']]);
        });

        it('works with leading only', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32, { leading: true, trailing: false });

            debounced('first');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            debounced('ignored');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            debounced('next');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['next']]);
        });

        it('works with trailing only', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32, { leading: false, trailing: true });

            debounced('first');
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(16);
            debounced('last');
            vi.advanceTimersByTime(31);
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(1);
            assert.deepStrictEqual(callback.mock.calls, [['last']]);
        });

        it('works with leading and trailing', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32, { leading: true, trailing: true });

            debounced('first');
            debounced('last');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['last']]);
        });

        it('does not run stale trailing arguments after the original wait period', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 200, { leading: true, trailing: true });

            debounced(1);
            vi.advanceTimersByTime(150);
            debounced(2);
            vi.advanceTimersByTime(60);
            debounced(3);
            assert.deepStrictEqual(callback.mock.calls, [[1]]);

            vi.advanceTimersByTime(200);
            assert.deepStrictEqual(callback.mock.calls, [[1], [3]]);

            vi.advanceTimersByTime(200);
            assert.deepStrictEqual(callback.mock.calls, [[1], [3]]);
        });

        it('works without leading or trailing', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32, { trailing: false });

            debounced();
            debounced();
            vi.advanceTimersByTime(64);

            assert.deepStrictEqual(callback.mock.calls, []);
        });

        it('uses the most recent arguments', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32);

            debounced('first', 1);
            debounced('last', 2);
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [['last', 2]]);
        });

        it('uses the most recent context', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 1);
            const expected = {};

            debounced.call({});
            debounced.call(expected);
            vi.advanceTimersByTime(1);

            assert.strictEqual(callback.mock.calls.length, 1);
            assert.strictEqual(callback.mock.contexts[0], expected);
        });

        it('allows callback to be cancelled', function() {
            const callback = vi.fn();
            const debounced = debounce(callback, 32);

            debounced();
            debounced.cancel();
            vi.advanceTimersByTime(64);

            assert.deepStrictEqual(callback.mock.calls, []);
        });
    });

    describe('#evaluate', function() {
        it('returns the result of a function', function() {
            const value = 42;
            const result = evaluate(
                (_) => value,
            );

            assert.strictEqual(result, value);
        });

        it('returns the value of a non-function', function() {
            const value = 42;
            const result = evaluate(value);

            assert.strictEqual(result, value);
        });
    });

    describe('#once', function() {
        it('returns a function that only executes once', function() {
            const callback = vi.fn();
            const runOnce = once(callback);

            runOnce();
            runOnce();

            assert.strictEqual(callback.mock.calls.length, 1);
        });

        it('returns the result of the first execution on subsequent calls', function() {
            const callback = vi.fn((value) => value);
            const runOnce = once(callback);
            const first = { value: 1 };

            assert.strictEqual(runOnce(first), first);
            assert.strictEqual(runOnce({ value: 2 }), first);
            assert.strictEqual(callback.mock.calls.length, 1);
        });

        it('retries after an error until the first successful execution', function() {
            const callback = vi.fn((value) => {
                if (value === 1) {
                    throw new Error('fail');
                }

                return value;
            });
            const runOnce = once(callback);

            assert.throws(
                () => runOnce(1),
                /fail/u,
            );

            assert.strictEqual(runOnce(2), 2);
            assert.strictEqual(runOnce(3), 2);
            assert.deepStrictEqual(callback.mock.calls, [[1], [2]]);
        });

        it('prevents re-entrant execution and preserves context', function() {
            let nestedResult;
            const context = { value: 42 };
            const callback = once(function() {
                nestedResult = callback();
                return this.value;
            });

            assert.strictEqual(callback.call(context), 42);
            assert.strictEqual(nestedResult, undefined);
            assert.strictEqual(callback(), 42);
        });

        it('caches a returned promise regardless of its outcome', async function() {
            const result = Promise.reject(new Error('fail'));
            const callback = once((_) => result);

            assert.strictEqual(callback(), result);
            assert.strictEqual(callback(), result);
            await assert.rejects(result, /fail/u);
        });
    });

    describe('#partial', function() {
        it('returns a function with partial arguments', function() {
            assert.strictEqual(
                partial(
                    (a, b) =>
                        a * b,
                    2,
                )(5),
                10,
            );
        });

        it('preserves context', function() {
            const callback = partial(function(amount) {
                return this.value + amount;
            }, 2);

            assert.strictEqual(callback.call({ value: 3 }), 5);
        });
    });

    describe('#pipe', function() {
        it('returns a piped function', function() {
            assert.strictEqual(
                pipe(
                    (x) => x / 2,
                    (x) => x + 2,
                    (x) => x * 3,
                )(5),
                13.5,
            );
        });

        it('preserves context', function() {
            const callback = pipe(function(value) {
                return this.amount + value;
            });

            assert.strictEqual(callback.call({ amount: 2 }, 3), 5);
        });
    });

    describe('#throttle', function() {
        it('returns a throttled function', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32);

            throttled();
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [[]]);
        });

        it('only executes once per wait period', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32);

            throttled('first');
            throttled('second');
            throttled('last');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            vi.advanceTimersByTime(31);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            vi.advanceTimersByTime(1);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['last']]);
        });

        it('executes for each wait period', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32);

            throttled('first');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            vi.advanceTimersByTime(32);
            throttled('second');
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['second']]);
        });

        it('works with leading only', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32, { trailing: false });

            throttled('first');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            throttled('ignored');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            throttled('next');
            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['next']]);
        });

        it('works with trailing only', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32, { leading: false });

            throttled('first');
            throttled('last');
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(31);
            assert.deepStrictEqual(callback.mock.calls, []);

            vi.advanceTimersByTime(1);
            assert.deepStrictEqual(callback.mock.calls, [['last']]);
        });

        it('works with leading and trailing', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32, { leading: true, trailing: true });

            throttled('first');
            throttled('last');
            assert.deepStrictEqual(callback.mock.calls, [['first']]);

            vi.advanceTimersByTime(32);
            assert.deepStrictEqual(callback.mock.calls, [['first'], ['last']]);
        });

        it('works without leading or trailing', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32, { leading: false, trailing: false });

            throttled();
            throttled();
            vi.advanceTimersByTime(64);

            assert.deepStrictEqual(callback.mock.calls, []);
        });

        it('uses the most recent arguments', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32);

            throttled('first', 1);
            throttled('last', 2);
            vi.advanceTimersByTime(32);

            assert.deepStrictEqual(callback.mock.calls, [['first', 1], ['last', 2]]);
        });

        it('uses the most recent context', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 1, { leading: false });
            const expected = {};

            throttled.call({});
            throttled.call(expected);
            vi.advanceTimersByTime(1);

            assert.strictEqual(callback.mock.calls.length, 1);
            assert.strictEqual(callback.mock.contexts[0], expected);
        });

        it('allows callback to be cancelled', function() {
            const callback = vi.fn();
            const throttled = throttle(callback, 32);

            throttled('first');
            throttled('cancelled');
            throttled.cancel();
            vi.advanceTimersByTime(64);

            assert.deepStrictEqual(callback.mock.calls, [['first']]);
        });
    });

    describe('#times', function() {
        it.each([
            ['executes a function x times', 3, 3],
            ['does not run for a negative amount', -3, 0],
        ])('%s', function(_, amount, expected) {
            const callback = vi.fn();

            times(callback, amount);

            assert.strictEqual(callback.mock.calls.length, expected);
        });

        it('stops when the callback returns false', function() {
            const callback = vi.fn().mockReturnValue(false);

            times(callback, 3);

            assert.strictEqual(callback.mock.calls.length, 1);
        });
    });
});
