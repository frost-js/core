import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { animation, compose, curry, debounce, evaluate, once, partial, pipe, random, throttle, times } from '../../src/index.js';

describe('Function', function() {
    beforeEach(function() {
        vi.useFakeTimers();
    });

    afterEach(function() {
        vi.useRealTimers();
    });

    describe('#animation', function() {
        it('returns an animation function', function() {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 1);
        });

        it('only executes once per animation frame', function() {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            callback();

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 1);
        });

        it('executes for each animation frame', function() {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            setTimeout(callback, 32);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('works without leading argument', function() {
            let finished = false;
            let callCount = 0;
            const callback = animation((_) => {
                if (finished) {
                    callCount++;
                }
            });

            callback();
            finished = true;

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 1);
        });

        it('works with leading argument', function() {
            let finished = false;
            let callCount = 0;
            const callback = animation((_) => {
                if (!finished) {
                    callCount++;
                }
            }, { leading: true });

            callback();
            finished = true;

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 1);
        });

        it('uses the most recent arguments', function() {
            let callCount = 0;
            const callback = animation((finished) => {
                if (!finished) {
                    return;
                }

                callCount++;
            });

            callback();
            callback(true);

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 1);
        });

        it('uses the most recent context', function() {
            const expected = {};
            let actual;
            const callback = animation(function() {
                actual = this;
            });

            callback.call({});
            callback.call(expected);

            vi.advanceTimersByTime(32);
            assert.strictEqual(actual, expected);
        });

        it('allows callback to be cancelled', function() {
            let callCount = 0;
            const callback = animation((_) => callCount++);

            callback();
            callback.cancel();

            vi.advanceTimersByTime(32);
            assert.strictEqual(callCount, 0);
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
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('only executes once per wait period', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();
            debounced();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('executes for each wait period', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 16);

            debounced();
            setTimeout(debounced, 16);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('only executes after wait period', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 16);

            debounced();
            setTimeout(debounced, 8);
            setTimeout(debounced, 16);

            vi.advanceTimersByTime(31);
            assert.strictEqual(callCount, 0);

            vi.advanceTimersByTime(33);
            assert.strictEqual(callCount, 1);
        });

        it('works with leading only', function() {
            let finished = false;
            let callCount = 0;
            const debounced = debounce((_) => {
                if (!finished) {
                    callCount++;
                }
            }, 32, { leading: true, trailing: false });

            debounced();
            setTimeout(debounced, 32);
            finished = true;

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('works with trailing only', function() {
            let finished = false;
            let callCount = 0;
            const debounced = debounce((_) => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32);

            debounced();
            setTimeout(debounced, 32);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('works with leading and trailing', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32, { leading: true, trailing: true });

            debounced();
            debounced();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('does not execute a stale trailing call after a new leading execution', function() {
            const calls = [];
            const debounced = debounce((value) => calls.push(value), 200, { leading: true, trailing: true });

            debounced(1);
            setTimeout((_) => debounced(2), 150);

            setTimeout((_) => debounced(3), 210);

            vi.advanceTimersByTime(450);

            const index3 = calls.indexOf(3);
            assert.notStrictEqual(index3, -1);

            assert.strictEqual(
                calls.slice(index3 + 1).includes(2),
                false,
            );
        });

        it('works without leading or trailing', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32, { trailing: false });

            debounced();
            debounced();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 0);
        });

        it('uses the most recent arguments', function() {
            let callCount = 0;
            const debounced = debounce((finished) => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            debounced();
            debounced(true);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('uses the most recent context', function() {
            const expected = {};
            let actual;
            const callback = debounce(function() {
                actual = this;
            }, 1);

            callback.call({});
            callback.call(expected);

            vi.advanceTimersByTime(1);
            assert.strictEqual(actual, expected);
        });

        it('allows callback to be cancelled', function() {
            let callCount = 0;
            const debounced = debounce((_) => callCount++, 32);

            debounced();
            debounced.cancel();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 0);
        });
    });

    describe('#evaluate', function() {
        it('returns the result of a function', function() {
            const value = random();
            const result = evaluate(
                (_) => value,
            );

            assert.strictEqual(result, value);
        });

        it('returns the value of a non-function', function() {
            const value = random();
            const result = evaluate(value);

            assert.strictEqual(result, value);
        });
    });

    describe('#once', function() {
        it('returns a function that only executes once', function() {
            let result = 0;
            const addOneOnce = once(
                (_) => result++,
            );

            for (let i = 0; i < 10; i++) {
                addOneOnce();
            }

            assert.strictEqual(result, 1);
        });

        it('returns the result of the first execution on subsequent calls', function() {
            const rand = once(Math.random);
            const results = new Set;

            for (let i = 0; i < 100; i++) {
                const value = rand();
                results.add(value);
            }

            assert.strictEqual(
                results.size,
                1,
            );
        });

        it('retries after an error until the first successful execution', function() {
            let callCount = 0;
            const callback = once((value) => {
                callCount++;

                if (callCount === 1) {
                    throw new Error('fail');
                }

                return value;
            });

            assert.throws(
                () => callback(1),
                /fail/u,
            );

            assert.strictEqual(
                callback(2),
                2,
            );

            assert.strictEqual(
                callback(3),
                2,
            );

            assert.strictEqual(callCount, 2);
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
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('only executes once per wait period', function() {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            throttled();
            throttled();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('executes for each wait period', function() {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            setTimeout(throttled, 32);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('works with leading only', function() {
            let finished = false;
            let callCount = 0;
            const throttled = throttle((_) => {
                if (!finished) {
                    callCount++;
                }
            }, 32, { trailing: false });

            throttled();
            setTimeout(throttled, 32);
            finished = true;

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('works with trailing only', function() {
            let finished = false;
            let callCount = 0;
            const throttled = throttle((_) => {
                if (!finished) {
                    callCount++;
                }

                finished = true;
            }, 32, { leading: false });

            throttled();
            setTimeout(throttled, 32);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('works with leading and trailing', function() {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            throttled();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 2);
        });

        it('works without leading or trailing', function() {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32, { leading: false, trailing: false });

            throttled();
            throttled();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 0);
        });

        it('uses the most recent arguments', function() {
            let callCount = 0;
            const throttled = throttle((finished) => {
                if (finished) {
                    callCount++;
                }
            }, 32);

            throttled();
            throttled(true);

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });

        it('uses the most recent context', function() {
            const expected = {};
            let actual;
            const callback = throttle(function() {
                actual = this;
            }, 1, { leading: false });

            callback.call({});
            callback.call(expected);

            vi.advanceTimersByTime(1);
            assert.strictEqual(actual, expected);
        });

        it('allows callback to be cancelled', function() {
            let callCount = 0;
            const throttled = throttle((_) => callCount++, 32);

            throttled();
            throttled();
            throttled.cancel();

            vi.advanceTimersByTime(64);
            assert.strictEqual(callCount, 1);
        });
    });

    describe('#times', function() {
        it('executes a function x times', function() {
            let result = 0;

            times(
                (_) => result++,
                500,
            );

            assert.strictEqual(
                result,
                500,
            );
        });

        it('does not run for a negative amount', function() {
            let result = 0;

            times(
                (_) => result++,
                -500,
            );

            assert.strictEqual(
                result,
                0,
            );
        });
    });
});
