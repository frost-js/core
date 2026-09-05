(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global._ = {})));
})(this, function(exports) {
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
//#region src/testing.js
/**
	* Testing methods
	*/
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var COMMENT_NODE = 8;
	var DOCUMENT_NODE = 9;
	var DOCUMENT_FRAGMENT_NODE = 11;
	/**
	* Checks whether a value is an array.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is an array.
	*/
	var isArray = Array.isArray;
	/**
	* Checks whether a value is array-like.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is array-like.
	*/
	var isArrayLike = (value) => {
		if (isArray(value)) return true;
		if (!isObject(value) || isFunction(value) || isWindow(value) || isElement(value)) return false;
		if (isFunction(value[Symbol.iterator])) return true;
		const length = value.length;
		return isNumeric(length) && (!length || length - 1 in value);
	};
	/**
	* Checks whether a value is a boolean.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a boolean.
	*/
	var isBoolean = (value) => typeof value === "boolean";
	/**
	* Checks whether a value is a Document.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a Document.
	*/
	var isDocument = (value) => !!value && value.nodeType === DOCUMENT_NODE;
	/**
	* Checks whether a value is an Element.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is an Element.
	*/
	var isElement = (value) => !!value && value.nodeType === ELEMENT_NODE;
	/**
	* Checks whether a value is a DocumentFragment (and not a ShadowRoot).
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a DocumentFragment.
	*/
	var isFragment = (value) => !!value && value.nodeType === DOCUMENT_FRAGMENT_NODE && !value.host;
	/**
	* Checks whether a value is a function.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a function.
	*/
	var isFunction = (value) => typeof value === "function";
	/**
	* Checks whether a value is NaN.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is NaN.
	*/
	var isNaN = Number.isNaN;
	/**
	* Checks whether a value is an Element, Text node, or Comment node.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is an Element, Text node, or Comment node.
	*/
	var isNode = (value) => !!value && (value.nodeType === ELEMENT_NODE || value.nodeType === TEXT_NODE || value.nodeType === COMMENT_NODE);
	/**
	* Checks whether a value is null.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is null.
	*/
	var isNull = (value) => value === null;
	/**
	* Checks whether a value is numeric.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is numeric.
	*/
	var isNumeric = (value) => {
		try {
			return !isNaN(parseFloat(value)) && isFinite(value);
		} catch {
			return false;
		}
	};
	/**
	* Checks whether a value is an object-like reference, including arrays and functions.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is an object-like reference.
	*/
	var isObject = (value) => !!value && value === Object(value);
	/**
	* Checks whether a value is a plain object.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a plain object.
	*/
	var isPlainObject = (value) => {
		if (!isObject(value)) return false;
		const prototype = Object.getPrototypeOf(value);
		return prototype === null || Object.getPrototypeOf(prototype) === null;
	};
	/**
	* Checks whether a value is a ShadowRoot.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a ShadowRoot.
	*/
	var isShadow = (value) => !!value && value.nodeType === DOCUMENT_FRAGMENT_NODE && !!value.host;
	/**
	* Checks whether a value is a string.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a string.
	*/
	var isString = (value) => typeof value === "string";
	/**
	* Checks whether a value is a text Node.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a text Node.
	*/
	var isText = (value) => !!value && value.nodeType === TEXT_NODE;
	/**
	* Checks whether a value is undefined.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is undefined.
	*/
	var isUndefined = (value) => value === void 0;
	/**
	* Checks whether a value is a Window.
	* @param {*} value The value to test.
	* @returns {boolean} Whether the value is a Window.
	*/
	var isWindow = (value) => !!value && !!value.document && value.document.defaultView === value;

//#endregion
//#region src/math.js
/**
	* Math methods
	*/
	/**
	* Gets the decimal precision represented by a number.
	* @param {number} value The input number.
	* @returns {number} The decimal precision.
	*/
	var getDecimalPlaces = (value) => {
		const [coefficient, exponent = 0] = `${value}`.toLowerCase().split("e");
		const decimals = (coefficient.split(".")[1] || "").length;
		return Math.max(0, decimals - Number(exponent));
	};
	/**
	* Clamps a value between a minimum and a maximum.
	* @param {number} value The value to clamp.
	* @param {number} [min=0] The minimum value of the clamped range.
	* @param {number} [max=1] The maximum value of the clamped range.
	* @returns {number} The clamped value.
	*/
	var clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
	/**
	* Clamps a value between 0 and 100.
	* @param {number} value The value to clamp.
	* @returns {number} The clamped value.
	*/
	var clampPercent = (value) => clamp(value, 0, 100);
	/**
	* Calculates the distance between two vectors.
	* @param {number} x1 The first vector X co-ordinate.
	* @param {number} y1 The first vector Y co-ordinate.
	* @param {number} x2 The second vector X co-ordinate.
	* @param {number} y2 The second vector Y co-ordinate.
	* @returns {number} The distance between the vectors.
	*/
	var dist = (x1, y1, x2, y2) => len(x1 - x2, y1 - y2);
	/**
	* Calculates the inverse linear interpolation amount from one value to another.
	* @param {number} v1 The starting value.
	* @param {number} v2 The ending value.
	* @param {number} value The value to inverse interpolate.
	* @returns {number} The interpolated amount.
	*/
	var inverseLerp = (v1, v2, value) => (value - v1) / (v2 - v1);
	/**
	* Calculates the length of an X,Y vector.
	* @param {number} x The X co-ordinate.
	* @param {number} y The Y co-ordinate.
	* @returns {number} The length of the vector.
	*/
	var len = Math.hypot;
	/**
	* Calculates a linear interpolation from one value to another.
	* @param {number} v1 The starting value.
	* @param {number} v2 The ending value.
	* @param {number} amount The amount to interpolate.
	* @returns {number} The interpolated value.
	*/
	var lerp = (v1, v2, amount) => v1 * (1 - amount) + v2 * amount;
	/**
	* Maps a value from one range to another.
	* @param {number} value The value to map.
	* @param {number} fromMin The minimum value of the current range.
	* @param {number} fromMax The maximum value of the current range.
	* @param {number} toMin The minimum value of the target range.
	* @param {number} toMax The maximum value of the target range.
	* @returns {number} The mapped value.
	*/
	var map = (value, fromMin, fromMax, toMin, toMax) => (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
	/**
	* Returns a random floating-point number.
	* @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
	* @param {number} [b] The maximum value (exclusive).
	* @returns {number} A random number.
	*/
	var random = (a = 1, b = null) => isNull(b) ? Math.random() * a : map(Math.random(), 0, 1, a, b);
	/**
	* Returns a random integer.
	* @param {number} [a=1] The upper bound (exclusive) when `b` is omitted; otherwise the minimum bound (inclusive).
	* @param {number} [b] The maximum value (exclusive).
	* @returns {number} A random integer.
	* @throws {RangeError} If the bounds contain no integer.
	*/
	var randomInt = (a = 1, b = null) => {
		const min = Math.ceil(Math.min(a, isNull(b) ? 0 : b));
		const max = Math.ceil(Math.max(a, isNull(b) ? 0 : b));
		if (min >= max) throw new RangeError("The bounds do not contain an integer");
		return min + Math.floor(Math.random() * (max - min));
	};
	/**
	* Constrains a number to a specified step size.
	* @param {number} value The value to constrain.
	* @param {number} step The step size.
	* @returns {number} The constrained value.
	*/
	var toStep = (value, step = .01) => {
		if (step === 0) return value;
		step = Math.abs(step);
		const result = Math.round(value / step) * step;
		const precision = getDecimalPlaces(step);
		if (precision > 100) return result;
		return parseFloat(result.toFixed(precision));
	};

//#endregion
//#region src/array.js
/**
	* Array methods
	*/
	/**
	* Creates a new array containing values from the first array that do not exist in any of the additional arrays.
	* @template T
	* @param {T[]} array The input array.
	* @param {...T[]} arrays The arrays to compare against.
	* @returns {T[]} The filtered array.
	*/
	var diff = (array, ...arrays) => {
		const sets = arrays.map((other) => new Set(other));
		return array.filter((value) => !sets.some((other) => other.has(value)));
	};
	/**
	* Creates a new array containing the unique values that exist in all of the provided arrays.
	* @template T
	* @param {...T[]} arrays The input arrays.
	* @returns {T[]} The intersected array.
	*/
	var intersect = (...arrays) => {
		if (!arrays.length) return [];
		const [array, ...others] = arrays;
		const sets = others.map((other) => new Set(other));
		return unique(array).filter((value) => sets.every((other) => other.has(value)));
	};
	/**
	* Merges values from one or more arrays or array-like objects into an array.
	* @template T
	* @param {T[]} [array=[]] The array to merge into.
	* @param {...ArrayLike<T>} arrays The arrays or array-like objects to merge.
	* @returns {T[]} The merged array.
	* @throws {RangeError} If an array-like length is infinite.
	*/
	var merge = (array = [], ...arrays) => {
		for (const other of arrays) {
			const length = Math.max(0, Math.floor(Number(other.length) || 0));
			if (!Number.isFinite(length)) throw new RangeError("Array-like length must be finite");
			for (let i = 0; i < length; i++) array.push(other[i]);
		}
		return array;
	};
	/**
	* Selects a random value from an array.
	* @template T
	* @param {T[]} array The input array.
	* @returns {T|null} A random value from the array, or null if the array is empty.
	*/
	var randomValue = (array) => array.length ? array[randomInt(array.length)] : null;
	/**
	* Creates an array containing a range of values.
	* @param {number} start The first value of the sequence.
	* @param {number} end The target value for the sequence. It is included only when the step lands on it exactly.
	* @param {number} [step=1] The increment between values in the sequence. Negative values are treated as positive, and `0` returns an empty array.
	* @returns {number[]} The array of values from start toward end.
	*/
	var range = (start, end, step = 1) => {
		if (step === 0) return [];
		step = Math.abs(step);
		const direction = Math.sign(end - start);
		const steps = toStep(Math.abs(end - start) / step, 1e-10);
		return Array.from({ length: Math.floor(steps) + 1 }, (_, index) => {
			if (index > 0 && index === steps) return end;
			return start + toStep(index * step * direction, step);
		});
	};
	/**
	* Removes duplicate elements from an array.
	* @template T
	* @param {T[]} array The input array.
	* @returns {T[]} The de-duplicated array.
	*/
	var unique = (array) => Array.from(new Set(array));
	/**
	* Creates an array from a value, copying iterable and array-like objects.
	* @template T
	* @param {T|T[]|ArrayLike<T>|Iterable<T>|undefined} value The input value.
	* @returns {T[]} The wrapped array.
	*/
	var wrap = (value) => {
		if (isUndefined(value)) return [];
		if (isArray(value)) return value;
		if (isObject(value) && isFunction(value[Symbol.iterator])) return Array.from(value);
		return isArrayLike(value) ? merge([], value) : [value];
	};

//#endregion
//#region src/function.js
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
	var isBrowser = typeof window !== "undefined" && "requestAnimationFrame" in window;
	/**
	* Schedules a callback on the next animation frame, using a timer outside browsers.
	* @param {Function} callback The callback to execute.
	* @returns {number|ReturnType<typeof setTimeout>} The animation frame ID or timer handle.
	*/
	var _requestAnimationFrame = isBrowser ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(callback, 1e3 / 60);
	/**
	* Creates a wrapped version of a function that executes at most once per animation frame
	* (using the most recent arguments passed to it).
	* @template {(...args: any[]) => any} T
	* @param {T} callback The function to wrap.
	* @param {object} [options] Options for executing the function.
	* @param {boolean} [options.leading=false] Whether to execute on the leading edge of the animation frame.
	* @returns {CancelableWrapper<T>} The wrapped function.
	*/
	var animation = (callback, { leading = false } = {}) => {
		let animationReference = null;
		let newArgs;
		let newThis;
		let running = false;
		const cancel = (_) => {
			if (animationReference !== null) {
				if (isBrowser) window.cancelAnimationFrame(animationReference);
				else clearTimeout(animationReference);
			}
			animationReference = null;
			newArgs = null;
			newThis = null;
			running = false;
		};
		const animation = function(...args) {
			newArgs = args;
			newThis = this;
			if (running) return;
			running = true;
			animationReference = _requestAnimationFrame((_) => {
				const args = newArgs;
				const thisArg = newThis;
				animationReference = null;
				newArgs = null;
				newThis = null;
				running = false;
				if (!leading) callback.apply(thisArg, args);
			});
			if (leading) try {
				callback.apply(this, args);
			} catch (error) {
				cancel();
				throw error;
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
	var compose = (...callbacks) => function(arg) {
		return callbacks.reduceRight((acc, callback) => callback.call(this, acc), arg);
	};
	/**
	* Creates a wrapped version of a function that returns new functions
	* until the number of total arguments passed reaches the arguments length
	* of the original function (at which point the function will execute).
	* @template {(...args: any[]) => any} T
	* @param {T} callback The function to wrap.
	* @returns {Function} The wrapped function.
	*/
	var curry = (callback) => {
		const curried = function(...args) {
			const thisArg = this;
			if (args.length >= callback.length) return callback.apply(thisArg, args);
			return (...newArgs) => curried.apply(thisArg, args.concat(newArgs));
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
	var debounce = (callback, wait = 0, { leading = false, trailing = true } = {}) => {
		let debounceReference = null;
		let newArgs;
		let newThis;
		let trailingPending = false;
		const cancel = (_) => {
			if (debounceReference !== null) clearTimeout(debounceReference);
			debounceReference = null;
			newArgs = null;
			newThis = null;
			trailingPending = false;
		};
		const debounced = function(...args) {
			if (!leading && !trailing) return;
			const callLeading = leading && debounceReference === null;
			if (debounceReference !== null) {
				clearTimeout(debounceReference);
				trailingPending = true;
			} else trailingPending = false;
			newArgs = args;
			newThis = this;
			debounceReference = setTimeout((_) => {
				const args = newArgs;
				const thisArg = newThis;
				const callTrailing = trailing && (!leading || trailingPending);
				debounceReference = null;
				newArgs = null;
				newThis = null;
				trailingPending = false;
				if (callTrailing) callback.apply(thisArg, args);
			}, wait);
			if (callLeading) try {
				callback.apply(this, args);
			} catch (error) {
				cancel();
				throw error;
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
	var evaluate = (value) => isFunction(value) ? value() : value;
	/**
	* Creates a wrapped version of a function that only ever executes once.
	* Subsequent calls to the wrapped function will return the result of the first successful call.
	* @template {(...args: any[]) => any} T
	* @param {T} callback The function to wrap.
	* @returns {(...args: Parameters<T>) => ReturnType<T>} The wrapped function.
	*/
	var once = (callback) => {
		let ran = false;
		let result;
		return function(...args) {
			if (ran) return result;
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
	var partial = (callback, ...defaultArgs) => function(...args) {
		const preparedArgs = defaultArgs.map((value) => isUndefined(value) ? args.shift() : value);
		return callback.apply(this, preparedArgs.concat(args));
	};
	/**
	* Creates a wrapped function that executes each callback in order,
	* passing the result from each function to the next.
	* @param {...((value: any) => any)} callbacks Callback functions to execute.
	* @returns {(arg: any) => any} The wrapped function.
	*/
	var pipe = (...callbacks) => function(arg) {
		return callbacks.reduce((acc, callback) => callback.call(this, acc), arg);
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
	var throttle = (callback, wait = 0, { leading = true, trailing = true } = {}) => {
		let throttleReference = null;
		let lastRan;
		let newArgs;
		let newThis;
		const cancel = (_) => {
			if (throttleReference !== null) clearTimeout(throttleReference);
			throttleReference = null;
			lastRan = void 0;
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
			const delta = lastRan === void 0 ? null : now - lastRan;
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
			if (!trailing) return;
			newArgs = args;
			newThis = this;
			if (throttleReference !== null) return;
			throttleReference = setTimeout(runTrailing, delta === null || !leading && delta >= wait ? wait : Math.max(0, wait - delta));
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
	var times = (callback, amount) => {
		while (amount-- > 0) if (callback() === false) break;
	};

//#endregion
//#region src/object.js
/**
	* Object methods
	*/
	/**
	* Checks whether an object has an own property.
	* @param {object} object The input object.
	* @param {string} key The key to check.
	* @returns {boolean} Whether the property belongs to the object itself.
	*/
	var hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
	/**
	* Assigns an own property, creating new properties without invoking inherited setters.
	* @param {object} object The object to modify.
	* @param {string} key The key to assign.
	* @param {*} value The value to assign.
	* @returns {void} Nothing.
	*/
	var assignOwn = (object, key, value) => {
		if (hasOwn(object, key)) {
			object[key] = value;
			return;
		}
		Object.defineProperty(object, key, {
			configurable: true,
			enumerable: true,
			value,
			writable: true
		});
	};
	/**
	* Sets a value using path segments, including wildcards.
	* @param {object} object The object to modify.
	* @param {string[]} keys The remaining path segments.
	* @param {*} value The value to assign.
	* @param {boolean} overwrite Whether existing values may be overwritten.
	* @returns {void} Nothing.
	*/
	var setDotSegments = (object, keys, value, overwrite) => {
		const [key, ...remainingKeys] = keys;
		if (key === "*") {
			for (const childKey of Object.keys(object)) {
				if (!remainingKeys.length) {
					if (overwrite) assignOwn(object, childKey, value);
					continue;
				}
				let child = object[childKey];
				if (!isObject(child)) {
					if (!overwrite) continue;
					child = {};
					assignOwn(object, childKey, child);
				}
				setDotSegments(child, remainingKeys, value, overwrite);
			}
			return;
		}
		if (remainingKeys.length) {
			let child = hasOwn(object, key) ? object[key] : void 0;
			if (!isObject(child)) {
				if (hasOwn(object, key) && !overwrite) return;
				child = {};
				assignOwn(object, key, child);
			}
			setDotSegments(child, remainingKeys, value, overwrite);
		} else if (overwrite || !hasOwn(object, key)) assignOwn(object, key, value);
	};
	/**
	* Merges values from one or more objects into an object (recursively).
	* @param {object} object The input object.
	* @param {...object} objects The objects to merge.
	* @returns {object} The extended object.
	*/
	var extend = (object, ...objects) => {
		for (const source of objects) {
			if (source == null) continue;
			for (const key of Object.keys(source)) {
				let value = source[key];
				const currentValue = hasOwn(object, key) ? object[key] : void 0;
				if (isArray(value)) {
					const target = isArray(currentValue) ? currentValue : [];
					target.length = Math.max(target.length, value.length);
					value = extend(target, value);
				} else if (isPlainObject(value)) {
					const target = isPlainObject(currentValue) ? currentValue : {};
					value = extend(target, value);
				}
				assignOwn(object, key, value);
			}
		}
		return object;
	};
	/**
	* Flattens an object using dot notation while preserving empty plain objects.
	* @param {object} object The input object.
	* @param {string} [prefix] The key prefix.
	* @returns {object} The flattened object.
	*/
	var flatten = (object, prefix = "") => Object.keys(object).reduce((acc, key) => {
		const prefixedKey = `${prefix}${key}`;
		if (isPlainObject(object[key]) && Object.keys(object[key]).length) {
			const flattened = flatten(object[key], `${prefixedKey}.`);
			for (const flattenedKey of Object.keys(flattened)) assignOwn(acc, flattenedKey, flattened[flattenedKey]);
		} else assignOwn(acc, prefixedKey, object[key]);
		return acc;
	}, {});
	/**
	* Removes a specified key from an object using dot notation.
	* @param {object} object The input object.
	* @param {string} key The key to remove from the object.
	* @returns {void} Nothing.
	*/
	var forgetDot = (object, key) => {
		const keys = key.split(".");
		while (keys.length) {
			key = keys.shift();
			if (!isObject(object) || !hasOwn(object, key)) break;
			if (keys.length) object = object[key];
			else delete object[key];
		}
	};
	/**
	* Retrieves an own value of a specified key from an object using dot notation.
	* @param {object} object The input object.
	* @param {string} key The key to retrieve from the object.
	* @param {*} [defaultValue] The default value if key does not exist.
	* @returns {*} The value retrieved from the object.
	*/
	var getDot = (object, key, defaultValue) => {
		const keys = key.split(".");
		while (keys.length) {
			key = keys.shift();
			if (!isObject(object) || !hasOwn(object, key)) return defaultValue;
			object = object[key];
		}
		return object;
	};
	/**
	* Checks whether a specified own key exists in an object using dot notation.
	* @param {object} object The input object.
	* @param {string} key The key to test for in the object.
	* @returns {boolean} Whether the key exists.
	*/
	var hasDot = (object, key) => {
		const keys = key.split(".");
		while (keys.length) {
			key = keys.shift();
			if (!isObject(object) || !hasOwn(object, key)) return false;
			object = object[key];
		}
		return true;
	};
	/**
	* Retrieves values of a specified key from an array of objects using dot notation.
	* @param {object[]} objects The input objects.
	* @param {string} key The key to retrieve from the objects.
	* @param {*} [defaultValue] The default value if key does not exist.
	* @returns {Array<*>} An array of values retrieved from the objects.
	*/
	var pluckDot = (objects, key, defaultValue) => objects.map((pointer) => getDot(pointer, key, defaultValue));
	/**
	* Sets a specified value of a key for an object using dot notation, including wildcard segments.
	* @param {object} object The input object.
	* @param {string} key The key to set in the object.
	* @param {*} value The value to set.
	* @param {{overwrite?: boolean}} [options] Options for setting the value.
	* @param {boolean} [options.overwrite=true] Whether to overwrite the value if the key already exists.
	* @returns {void} Nothing.
	*/
	var setDot = (object, key, value, { overwrite = true } = {}) => setDotSegments(object, key.split("."), value, overwrite);

//#endregion
//#region src/string.js
	var escapeChars = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&apos;"
	};
	var unescapeChars = {
		amp: "&",
		lt: "<",
		gt: ">",
		quot: "\"",
		apos: "'"
	};
	/**
	* String methods
	*/
	/**
	* Splits a string into individual words.
	* @param {string} string The input string.
	* @returns {string[]} The split parts of the string.
	*/
	var _splitString = (string) => `${string}`.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").split(/[^a-zA-Z0-9']/).reduce((acc, word) => {
		word = word.replace(/[^\w]/g, "").toLowerCase();
		if (word) acc.push(word);
		return acc;
	}, []);
	/**
	* Converts a string to camelCase.
	* @param {string} string The input string.
	* @returns {string} The camelCased string.
	*/
	var camelCase = (string) => _splitString(string).map((word, index) => index ? capitalize(word) : word).join("");
	/**
	* Converts the first character of a string to upper case and the remaining to lower case.
	* @param {string} string The input string.
	* @returns {string} The capitalized string.
	*/
	var capitalize = (string) => string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	/**
	* Escapes HTML special characters in a string using HTML entities.
	* @param {string} string The input string.
	* @returns {string} The escaped string.
	*/
	var escape = (string) => string.replace(/[&<>"']/g, (match) => escapeChars[match]);
	/**
	* Escapes RegExp special characters in a string.
	* @param {string} string The input string.
	* @returns {string} The escaped string.
	*/
	var escapeRegExp = (string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, (match) => match === "-" ? "\\x2d" : `\\${match}`);
	/**
	* Converts a string to a humanized form.
	* @param {string} string The input string.
	* @returns {string} The humanized string.
	*/
	var humanize = (string) => capitalize(_splitString(string).join(" "));
	/**
	* Converts a string to kebab-case.
	* @param {string} string The input string.
	* @returns {string} The kebab-cased string.
	*/
	var kebabCase = (string) => _splitString(string).join("-");
	/**
	* Converts a string to PascalCase.
	* @param {string} string The input string.
	* @returns {string} The PascalCased string.
	*/
	var pascalCase = (string) => _splitString(string).map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join("");
	/**
	* Creates a random string.
	* @param {number} [length=16] The number of characters in the output string.
	* @param {string} [chars=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789] The non-empty Unicode characters to generate the string from.
	* @throws {TypeError} If chars is empty.
	* @returns {string} The random string.
	*/
	var randomString = (length = 16, chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") => {
		const characters = Array.from(chars);
		if (!characters.length) throw new TypeError("chars must not be empty");
		return new Array(length).fill().map((_) => characters[randomInt(characters.length)]).join("");
	};
	/**
	* Converts a string to snake_case.
	* @param {string} string The input string.
	* @returns {string} The snake_cased string.
	*/
	var snakeCase = (string) => _splitString(string).join("_");
	/**
	* Unescapes HTML entities in a string into their corresponding characters.
	* @param {string} string The input string.
	* @returns {string} The unescaped string.
	*/
	var unescape = (string) => string.replace(/&(amp|lt|gt|quot|apos);/g, (_, code) => unescapeChars[code]);

//#endregion
exports.animation = animation;
exports.camelCase = camelCase;
exports.capitalize = capitalize;
exports.clamp = clamp;
exports.clampPercent = clampPercent;
exports.compose = compose;
exports.curry = curry;
exports.debounce = debounce;
exports.diff = diff;
exports.dist = dist;
exports.escape = escape;
exports.escapeRegExp = escapeRegExp;
exports.evaluate = evaluate;
exports.extend = extend;
exports.flatten = flatten;
exports.forgetDot = forgetDot;
exports.getDot = getDot;
exports.hasDot = hasDot;
exports.humanize = humanize;
exports.intersect = intersect;
exports.inverseLerp = inverseLerp;
exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isBoolean = isBoolean;
exports.isDocument = isDocument;
exports.isElement = isElement;
exports.isFragment = isFragment;
exports.isFunction = isFunction;
exports.isNaN = isNaN;
exports.isNode = isNode;
exports.isNull = isNull;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isShadow = isShadow;
exports.isString = isString;
exports.isText = isText;
exports.isUndefined = isUndefined;
exports.isWindow = isWindow;
exports.kebabCase = kebabCase;
exports.len = len;
exports.lerp = lerp;
exports.map = map;
exports.merge = merge;
exports.once = once;
exports.partial = partial;
exports.pascalCase = pascalCase;
exports.pipe = pipe;
exports.pluckDot = pluckDot;
exports.random = random;
exports.randomInt = randomInt;
exports.randomString = randomString;
exports.randomValue = randomValue;
exports.range = range;
exports.setDot = setDot;
exports.snakeCase = snakeCase;
exports.throttle = throttle;
exports.times = times;
exports.toStep = toStep;
exports.unescape = unescape;
exports.unique = unique;
exports.wrap = wrap;
});
//# sourceMappingURL=frost-core.js.map