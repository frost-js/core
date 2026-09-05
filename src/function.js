import { isFunction, isUndefined } from './testing.js';

/**
 * Function methods
 */

/**
 * A wrapped callback that exposes a `cancel()` method.
 * @template {(...args: any[]) => any} T
 * @typedef {((...args: Parameters<T>) => void) & { cancel: () => void }} CancelableWrapper
 */

/**
 * Whether the browser animation frame API is available.
 * @type {boolean}
 */
const isBrowser = typeof window !== 'undefined' && 'requestAnimationFrame' in window;

/**
 * Schedules a callback on the next animation frame, using a timer outside browsers.
 * @param {Function} callback The callback to execute.
 * @returns {number|ReturnType<typeof setTimeout>} The animation frame ID or timer handle.
 */
const _requestAnimationFrame = isBrowser ?
    (callback) => window.requestAnimationFrame(callback) :
    (callback) => setTimeout(callback, 1000 / 60);

/**
 * Creates a wrapped version of a function that executes at most once per animation frame
 * (using the most recent arguments passed to it).
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @param {object} [options] Options for executing the function.
 * @param {boolean} [options.leading=false] Whether to execute on the leading edge of the animation frame.
 * @returns {CancelableWrapper<T>} The wrapped function.
 */
export const animation = (callback, { leading = false } = {}) => {
    let animationReference = null;
    let newArgs;
    let newThis;
    let running = false;

    const cancel = (_) => {
        if (animationReference !== null) {
            if (isBrowser) {
                window.cancelAnimationFrame(animationReference);
            } else {
                clearTimeout(animationReference);
            }
        }

        animationReference = null;
        newArgs = null;
        newThis = null;
        running = false;
    };

    const animation = function(...args) {
        newArgs = args;
        newThis = this;

        if (running) {
            return;
        }

        running = true;
        animationReference = _requestAnimationFrame((_) => {
            const args = newArgs;
            const thisArg = newThis;

            animationReference = null;
            newArgs = null;
            newThis = null;
            running = false;

            if (!leading) {
                callback.apply(thisArg, args);
            }
        });

        if (leading) {
            try {
                callback.apply(this, args);
            } catch (error) {
                cancel();
                throw error;
            }
        }
    };

    animation.cancel = cancel;

    return animation;
};

/**
 * Creates a wrapped function that executes each callback in reverse order,
 * passing the result from each function to the previous.
 * @param {...((value: any) => any)} callbacks Callback functions to execute.
 * @returns {(arg: any) => any} The wrapped function.
 */
export const compose = (...callbacks) =>
    function(arg) {
        return callbacks.reduceRight(
            (acc, callback) =>
                callback.call(this, acc),
            arg,
        );
    };

/**
 * Creates a wrapped version of a function that returns new functions
 * until the number of total arguments passed reaches the arguments length
 * of the original function (at which point the function will execute).
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @returns {Function} The wrapped function.
 */
export const curry = (callback) => {
    const curried = function(...args) {
        const thisArg = this;
        if (args.length >= callback.length) {
            return callback.apply(thisArg, args);
        }

        return (...newArgs) =>
            curried.apply(thisArg, args.concat(newArgs));
    };

    return curried;
};

/**
 * Creates a wrapped version of a function that executes once per wait period
 * (using the most recent arguments passed to it).
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @param {number} [wait=0] The number of milliseconds to wait until next execution.
 * @param {object} [options] Options for executing the function.
 * @param {boolean} [options.leading=false] Whether to execute on the leading edge of the wait period.
 * @param {boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
 * @returns {CancelableWrapper<T>} The wrapped function.
 */
export const debounce = (callback, wait = 0, { leading = false, trailing = true } = {}) => {
    let debounceReference = null;
    let newArgs;
    let newThis;
    let trailingPending = false;

    const cancel = (_) => {
        if (debounceReference !== null) {
            clearTimeout(debounceReference);
        }

        debounceReference = null;
        newArgs = null;
        newThis = null;
        trailingPending = false;
    };

    const debounced = function(...args) {
        if (!leading && !trailing) {
            return;
        }

        const callLeading = leading && debounceReference === null;
        if (debounceReference !== null) {
            clearTimeout(debounceReference);
            trailingPending = true;
        } else {
            trailingPending = false;
        }

        newArgs = args;
        newThis = this;

        debounceReference = setTimeout(
            (_) => {
                const args = newArgs;
                const thisArg = newThis;
                const callTrailing = trailing && (!leading || trailingPending);

                debounceReference = null;
                newArgs = null;
                newThis = null;
                trailingPending = false;

                if (callTrailing) {
                    callback.apply(thisArg, args);
                }
            },
            wait,
        );

        if (callLeading) {
            try {
                callback.apply(this, args);
            } catch (error) {
                cancel();
                throw error;
            }
        }
    };

    debounced.cancel = cancel;

    return debounced;
};

/**
 * Evaluates a value from a function or a value.
 * @template T
 * @param {T|(() => T)} value The value to evaluate.
 * @returns {T} The evaluated value.
 */
export const evaluate = (value) =>
    isFunction(value) ?
        value() :
        value;

/**
 * Creates a wrapped version of a function that only ever executes once.
 * Subsequent calls to the wrapped function will return the result of the first successful call.
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @returns {(...args: Parameters<T>) => ReturnType<T>} The wrapped function.
 */
export const once = (callback) => {
    let ran = false;
    let result;

    return function(...args) {
        if (ran) {
            return result;
        }

        ran = true;
        try {
            result = callback.apply(this, args);
            return result;
        } catch (error) {
            ran = false;
            throw error;
        }
    };
};

/**
 * Creates a wrapped version of a function with predefined arguments.
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @param {...*} [defaultArgs] Default arguments to pass to the function.
 * @returns {(...args: any[]) => ReturnType<T>} The wrapped function.
 */
export const partial = (callback, ...defaultArgs) =>
    function(...args) {
        const preparedArgs = defaultArgs.map((value) =>
            isUndefined(value) ? args.shift() : value,
        );

        return callback.apply(this, preparedArgs.concat(args));
    };

/**
 * Creates a wrapped function that executes each callback in order,
 * passing the result from each function to the next.
 * @param {...((value: any) => any)} callbacks Callback functions to execute.
 * @returns {(arg: any) => any} The wrapped function.
 */
export const pipe = (...callbacks) =>
    function(arg) {
        return callbacks.reduce(
            (acc, callback) =>
                callback.call(this, acc),
            arg,
        );
    };

/**
 * Creates a wrapped version of a function that executes at most once per wait period.
 * (using the most recent arguments passed to it).
 * @template {(...args: any[]) => any} T
 * @param {T} callback The function to wrap.
 * @param {number} [wait=0] The number of milliseconds to wait until next execution.
 * @param {object} [options] Options for executing the function.
 * @param {boolean} [options.leading=true] Whether to execute on the leading edge of the wait period.
 * @param {boolean} [options.trailing=true] Whether to execute on the trailing edge of the wait period.
 * @returns {CancelableWrapper<T>} The wrapped function.
 */
export const throttle = (callback, wait = 0, { leading = true, trailing = true } = {}) => {
    let throttleReference = null;
    let lastRan;
    let newArgs;
    let newThis;

    const cancel = (_) => {
        if (throttleReference !== null) {
            clearTimeout(throttleReference);
        }

        throttleReference = null;
        lastRan = undefined;
        newArgs = null;
        newThis = null;
    };

    const runTrailing = (_) => {
        const args = newArgs;
        const thisArg = newThis;

        throttleReference = null;
        newArgs = null;
        newThis = null;
        lastRan = Date.now();
        callback.apply(thisArg, args);
    };

    const throttled = function(...args) {
        const now = Date.now();
        const delta = lastRan === undefined ?
            null :
            now - lastRan;

        if (leading && (delta === null || delta >= wait)) {
            if (throttleReference !== null) {
                clearTimeout(throttleReference);
                throttleReference = null;
            }

            newArgs = null;
            newThis = null;
            lastRan = now;

            try {
                callback.apply(this, args);
            } catch (error) {
                cancel();
                throw error;
            }
            return;
        }

        if (!trailing) {
            return;
        }

        newArgs = args;
        newThis = this;

        if (throttleReference !== null) {
            return;
        }

        throttleReference = setTimeout(
            runTrailing,
            delta === null || (!leading && delta >= wait) ?
                wait :
                Math.max(0, wait - delta),
        );
    };

    throttled.cancel = cancel;

    return throttled;
};

/**
 * Executes a function a specified number of times.
 * @param {() => (boolean|void)} callback The callback function to execute.
 * @param {number} amount The number of times to execute the callback.
 * @returns {void} Nothing.
 */
export const times = (callback, amount) => {
    while (amount-- > 0) {
        if (callback() === false) {
            break;
        }
    }
};
