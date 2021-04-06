module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    mstrHyper: 'readonly',
    hyperCards: 'readonly'
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      version: '999.999.999'
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-eval': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ]
  }
};
