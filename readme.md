# filter-console

> Filter out unwanted `console.log()` output

Can be useful when you don't control the output, for example, filtering out PropType warnings from a third-party React component.

## Install

```
$ npm install filter-console
```

## Usage

```js
import filterConsole from 'filter-console';

const disableFilter = filterConsole(['🐼']);

const log = () => {
	console.log('');
	console.log('🦄');
	console.log('🐼');
	console.log('🐶');
};

log();

disableFilter();

log();
```

```
$ node example.js

🦄
🐶

🦄
🐼
🐶
```

## API

### filterConsole(excludePatterns, options?)

Returns a function, which when called, disables the filter.

#### excludePatterns

Type: `Array<string | RegExp | Function>`

Console output that matches any of the given patterns are filtered from being logged. The patterns are matched against what would be logged and not the `console` method input arguments directly. Meaning an exclude pattern of `'foo bar'` will match `console.log('foo %s', 'bar')`.

Filter types:
- `string`: Checks if the string pattern is included in the console output.
- `RegExp`: Checks if the RegExp pattern matches the console output.
- `Function`: Receives the console output as a string and is expected to return a truthy/falsy value of whether to exclude it.

#### options

Type: `object`

##### methods

Type: `string[]`\
Default: `['log', 'debug', 'info', 'warn', 'error']`

Console methods to filter.

##### console

Type: `object`\
Default: `console`

Use a custom `console` object. Can be useful for testing or mocking.
