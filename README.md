# postcss-variables-prefixer
[![Build Status](https://travis-ci.org/ryuran/postcss-variables-prefixer.svg?branch=master)](https://travis-ci.org/ryuran/postcss-variables-prefixer) [![dependencies Status](https://david-dm.org/ryuran/postcss-variables-prefixer/status.svg)](https://david-dm.org/ryuran/postcss-variables-prefixer) [![devDependencies Status](https://david-dm.org/ryuran/postcss-variables-prefixer/dev-status.svg)](https://david-dm.org/ryuran/postcss-variables-prefixer?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

PostCSS plugin to add a prefix to all css custom properties.

## Usage
### With [PostCSS cli](https://github.com/postcss/postcss-cli):

Install `postcss-cli` and `postcss-variables-prefixer` on your project directory:

```
npm install postcss-cli postcss-variables-prefixer --save-dev
```

and in your package.json

```json
"scripts": {
    "postcss": "postcss input.css -u postcss-variables-prefixer -o output.css"
}
```

### Others
```js
postcss([ require('postcss-variables-prefixer')({ /* options */ }) ])
```

### Options
#### prefix
Type: `string`<br>
Default: none

String to be used as prefix

#### ignore
Type: `array`<br>
Default: `[]`

Array of css custom properties to be ignored by the plugin, accepts string and regex.

## Example
Example of usage with results generated by the plugin.

### Code
```js
const postcss = require('postcss');
const prefixer = require('postcss-variables-prefixer');

const input = fs.readFileSync('path/to/file.css',  'utf-8');

const output = postcss([
  prefixer({
        prefix: 'prefix-',
        ignore: [ /bar/, '--ignore' ]
    })
]).process(input);

```

### Input:
```css
:root {
  --foo: red;
  --foo-bar: green;
  --ignore: 300px;
  --not-ignored: 100px;
  --bar: yellow;
}

div {
  background-color: var(--foo);
  color: var(--foo-bar);
  width: var(--ignore);
  height: var(--not-ignored);
  border-color: var(--bar)
}
```

### Output:
```css
:root {
  --prefix-foo: red;
  --foo-bar: green;
  --ignore: 300px;
  --prefix-not-ignored: 100px;
  --bar: yellow;
}

div {
  background-color: var(--prefix-foo);
  color: var(--foo-bar);
  width: var(--ignore);
  height: var(--prefix-not-ignored);
  border-color: var(--bar)
}
```

## Credits
Plugin based on [postcss-prefixer](https://github.com/marceloucker/postcss-prefixer) created by [marceloucker](https://github.com/marceloucker).