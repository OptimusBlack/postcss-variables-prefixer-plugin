const { itMatchsOne } = require('./utils');

// https://regex101.com/r/aOkFLB/1

module.exports = (options = {}) => {
  const { prefix, ignore } = {
    prefix: '',
    ignore: [],
    ...options,
  };

  if (typeof prefix !== 'string') {
    throw new Error('@postcss-variables-prefixer: prefix option should be of type string.');
  }

  if (!Array.isArray(ignore)) {
    throw new Error('@postcss-variables-prefixer: ignore options should be an Array.');
  }

  const valueRegex = new RegExp(`var\\(\\s*(--(?!${prefix})[^,\\s]+?)(?:\\s*,\\s*(.+))?\\s*\\)`, 'g');

  const propRegex = new RegExp(`^--(?!${prefix})`);

  return function (root) { // eslint-disable-line func-names
    root.walk((decl) => {
      if (!prefix.length) {
        return;
      }

      if (propRegex.test(decl.prop) && !itMatchsOne(ignore, decl.prop)) {
        const newProp = decl.prop.replace(/^--/g, `--${prefix}`);
        decl.prop = newProp; // eslint-disable-line no-param-reassign
      }

      if (decl.value && decl.value.includes('var(')) {
        // get vars
        const varMatches = decl.value.match(valueRegex);

        if (varMatches && varMatches.length > 0) {
          const toReplace = varMatches.filter((varDecl) => {
            const match = valueRegex.exec(varDecl);
            valueRegex.lastIndex = 0;

            return match && !itMatchsOne(ignore, match[1]);
          });

          if (toReplace.length > 0) {
            let newValue = decl.value;

            toReplace.forEach((varDecl) => {
              newValue = newValue.replace(varDecl, varDecl.replace(/^var\(\s*--/, `var(--${prefix}`));
            });

            decl.value = newValue; // eslint-disable-line no-param-reassign
          }
        }
      }
    });
  };
};

module.exports.postcss = true;
