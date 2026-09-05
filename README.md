# Frost Core

[![CI](https://github.com/frost-js/core/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/frost-js/core/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/frost-js/core/branch/main/graph/badge.svg)](https://codecov.io/gh/frost-js/core)
[![npm version](https://img.shields.io/npm/v/%40fr0st%2Fcore?style=flat-square)](https://www.npmjs.com/package/@fr0st/core)
[![npm downloads](https://img.shields.io/npm/dm/%40fr0st%2Fcore?style=flat-square)](https://www.npmjs.com/package/@fr0st/core)
[![JS gzip size](https://img.badgesize.io/frost-js/core/main/dist/frost-core.min.js?compression=gzip&label=JS%20gzip%20size&style=flat-square)](https://github.com/frost-js/core/blob/main/dist/frost-core.min.js)
[![license](https://img.shields.io/github/license/frost-js/core?style=flat-square)](./LICENSE)

Small, focused utilities for arrays, functions, math, objects, strings, and type checks. Frost Core has zero runtime dependencies, works in Node and bundlers, and also ships a browser-friendly UMD bundle that exposes `globalThis._`.

## Highlights

- Named exports for tree-shaking
- Prebuilt ESM and UMD bundles in `dist/`
- No runtime dependencies
- JSDoc-powered IntelliSense

## Installation

### Node / bundlers

```bash
npm i @fr0st/core
```

Frost Core's package entry point is ESM-only. Use `import` syntax in Node and bundlers.

```js
import { clamp, randomInt } from '@fr0st/core';
```

### Browser (ESM)

Import the minified ESM bundle directly from a CDN:

```html
<script type="module">
    import { clamp, randomInt } from 'https://cdn.jsdelivr.net/npm/@fr0st/core@latest/dist/frost-core.esm.min.js';

    console.log(clamp(randomInt(10), 0, 9));
</script>
```

### Browser (UMD)

Load the bundle from your own copy or a CDN:

```html
<script src="/path/to/dist/frost-core.min.js"></script>
<!-- or -->
<script src="https://cdn.jsdelivr.net/npm/@fr0st/core@latest/dist/frost-core.min.js"></script>
<script>
    const { clamp, randomInt } = globalThis._;
    console.log(clamp(randomInt(10), 0, 9));
</script>
```

The package root resolves to the prebuilt ESM bundle. Published files under `dist/` and `src/` are also available through matching package subpaths.

## Quick Start

```js
import {
    clamp,
    debounce,
    humanize,
    range,
    setDot,
} from '@fr0st/core';

const state = { user: { profile: { name: 'Ada' } } };

setDot(state, 'user.profile.name', 'Ada Lovelace');

const values = range(0, 10, 2);
const label = humanize('favoriteColor');

const save = debounce(() => {
    console.log('saving', state, values, label);
}, 250);

console.log(clamp(14, 0, 10)); // 10
save();
```

TypeScript note: Frost Core is written in JavaScript and uses JSDoc types, which most editors surface as IntelliSense.

## API

All utilities are exported from `@fr0st/core` as named ESM exports.

### Arrays

- `diff(array, ...arrays)`: values that exist only in the first array
- `intersect(...arrays)`: unique values shared by all arrays
- `merge(array, ...arrays)`: appends arrays or array-like values into the first array
- `randomValue(array)`: random element from an array, or `null` for an empty array
- `range(start, end, step = 1)`: numeric sequence from `start` toward `end`
- `unique(array)`: remove duplicate values
- `wrap(value)`: normalize a value into an array, returning existing arrays as-is

```js
import { diff, merge, range, unique, wrap } from '@fr0st/core';

diff([1, 2, 3], [2]); // [1, 3]
range(0, 5); // [0, 1, 2, 3, 4, 5]
range(0, 5, 2); // [0, 2, 4]
range(1, 1.4, 0.1); // [1, 1.1, 1.2, 1.3, 1.4]
unique([1, 1, 2]); // [1, 2]
wrap(undefined); // []
wrap(new Set([1, 2])); // [1, 2]

const out = [1];
merge(out, [2, 3]);
// out is now [1, 2, 3]
```

### Functions

- `animation(callback, options)`: run at most once per animation frame
- `compose(...callbacks)`: right-to-left function composition
- `curry(callback)`: curry a function until its arity is satisfied
- `debounce(callback, wait, options)`: delay execution until calls settle
- `evaluate(value)`: call a function or return a non-function as-is
- `once(callback)`: cache the first returned result, retrying after synchronous errors
- `partial(callback, ...defaultArgs)`: partially apply arguments
- `pipe(...callbacks)`: left-to-right function composition
- `throttle(callback, wait, options)`: run at most once per wait period
- `times(callback, amount)`: execute a callback repeatedly, stopping if it returns `false`

```js
import { compose, debounce, once, partial, pipe, throttle } from '@fr0st/core';

const add1 = (n) => n + 1;
const double = (n) => n * 2;

compose(add1, double)(3); // 7
pipe(add1, double)(3); // 8

const init = once(() => Math.random());
init() === init(); // true

partial((a, b) => [a, b], undefined, 2)(1); // [1, 2]

const debounced = debounce((value) => console.log(value), 100);
const throttled = throttle(() => console.log('tick'), 100);

debounced('last');
throttled();
```

### Math

- `clamp(value, min, max)`: clamp a number between bounds
- `clampPercent(value)`: clamp a number between `0` and `100`
- `dist(x1, y1, x2, y2)`: distance between two points
- `inverseLerp(v1, v2, value)`: interpolation amount between two values
- `len(x, y)`: vector length
- `lerp(v1, v2, amount)`: linear interpolation
- `map(value, fromMin, fromMax, toMin, toMax)`: remap a value from one range to another
- `random(a, b)`: random floating-point value
- `randomInt(a, b)`: random integer, throwing when the bounds contain no integer
- `toStep(value, step)`: round a number to a step size

```js
import { clamp, dist, lerp, map, random, randomInt, toStep } from '@fr0st/core';

clamp(10, 0, 1); // 1
dist(0, 0, 3, 4); // 5
lerp(0, 10, 0.25); // 2.5
map(0.5, 0, 1, 0, 10); // 5
random(10); // 0 <= n < 10
randomInt(10, 50); // 10 <= n < 50
randomInt(1.2, 5.8); // 2, 3, 4, or 5
toStep(0.123, 0.05); // 0.1
```

### Objects

- `extend(object, ...objects)`: deep-merge values into the first object
- `flatten(object, prefix = '')`: flatten plain-object paths into dot notation while preserving empty objects
- `forgetDot(object, key)`: delete a path from an object
- `getDot(object, key, defaultValue)`: read a path from an object
- `hasDot(object, key)`: test whether a path exists
- `pluckDot(objects, key, defaultValue)`: read the same path from many objects
- `setDot(object, key, value, options)`: assign a path in an object

```js
import { extend, flatten, getDot, pluckDot, setDot } from '@fr0st/core';

const obj = extend({ a: 1 }, { b: { c: 2 } });

getDot(obj, 'b.c'); // 2
flatten({ a: { b: 1 } }); // { 'a.b': 1 }
pluckDot([{ a: { b: 1 } }, { a: { b: 2 } }], 'a.b'); // [1, 2]

setDot(obj, 'b.c', 3);

obj.users = [{ active: false }, { active: false }];
setDot(obj, 'users.*.active', true);
obj.users; // [{ active: true }, { active: true }]

setDot(obj, 'user..name', 'Ada');
getDot(obj, 'user..name'); // 'Ada' (the middle key is an empty string)
```

### Strings

- `camelCase(string)`: convert text to `camelCase`
- `capitalize(string)`: upper-case the first character and lower-case the rest
- `escape(string)`: escape HTML entities
- `escapeRegExp(string)`: escape RegExp control characters
- `humanize(string)`: convert identifiers into readable words
- `kebabCase(string)`: convert text to `kebab-case`
- `pascalCase(string)`: convert text to `PascalCase`
- `randomString(length, chars)`: create a random string from non-empty Unicode characters
- `snakeCase(string)`: convert text to `snake_case`
- `unescape(string)`: unescape HTML entities

```js
import { camelCase, escape, humanize, kebabCase, randomString, snakeCase } from '@fr0st/core';

camelCase('HELLO WORLD'); // 'helloWorld'
camelCase('XMLParser'); // 'xmlParser'
camelCase('MySQL'); // 'mySql'
humanize('helloWorld'); // 'Hello world'
kebabCase('helloWorld'); // 'hello-world'
snakeCase('helloWorld'); // 'hello_world'
escape('<div class="x">'); // '&lt;div class=&quot;x&quot;&gt;'
randomString(8); // e.g. 'aZ02kLmP'
```

### Testing

- `isArray(value)`
- `isArrayLike(value)`
- `isBoolean(value)`
- `isDocument(value)`
- `isElement(value)`
- `isFragment(value)`
- `isFunction(value)`
- `isNaN(value)`
- `isNode(value)`
- `isNull(value)`
- `isNumeric(value)`
- `isObject(value)`
- `isPlainObject(value)`
- `isShadow(value)`
- `isString(value)`
- `isText(value)`
- `isUndefined(value)`
- `isWindow(value)`

```js
import {
    isArray,
    isArrayLike,
    isFunction,
    isNumeric,
    isPlainObject,
} from '@fr0st/core';

isArray([]); // true
isArrayLike({ 0: 'a', length: 1 }); // true
isFunction(() => {}); // true
isNumeric('123.45'); // true
isPlainObject({}); // true
```

## Behavior Notes

- `merge()` and `extend()` mutate and return the first argument.
- `extend()` recursively merges nested plain objects and arrays, including plain objects from other JavaScript contexts. Nested arrays merge by index and preserve sparse lengths without shortening existing arrays.
- `wrap()` returns existing arrays as-is, copies other iterable and array-like objects, and wraps scalar values in an array. `undefined` becomes `[]`.
- `debounce()`, `throttle()`, and `animation()` return wrapped functions with `cancel()`.
- Function wrappers preserve their call-site `this` value, and delayed wrappers use the most recent call-site value. Curried functions keep the context from the first call.
- `range()` uses the absolute value of `step`, returns `[]` for `step === 0`, and includes `end` when it aligns with the step, allowing for small floating-point rounding errors.
- Dot-path helpers use own properties and treat empty segments as empty-string keys.
- `setDot()` supports `*` wildcard segments over existing keys and an `{ overwrite }` option, which defaults to `true`.
- `randomString()` uses `Math.random()` and must not be used for passwords, tokens, or other security-sensitive values.
- `random()` and `randomInt()` use an exclusive upper bound.
- With one argument, `random()` and `randomInt()` use `0` as the other bound. `randomInt()` accepts bounds in either order and throws a `RangeError` when they contain no integer.

## Development

```bash
npm test
npm run lint
npm run build
```

## License

Frost Core is released under the [MIT License](./LICENSE).
