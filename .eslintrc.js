module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "plugins": [
    "react"
  ],
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "globals": {
    "__DEV__": false,
  },
  "rules": {
    "arrow-parens": 0,
    "no-invalid-this": 0,
    "jsx-quotes": 1,
    "react/display-name": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-curly-spacing": 0,
    "react/jsx-handler-names": 0,
    "react/jsx-indent-props": [2, 2],
    "react/jsx-indent": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 0,
    "react/no-deprecated": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-is-mounted": 1,
    "react/no-multi-comp": 0,
    "react/no-set-state": 0,
    "react/no-string-refs": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    // "react/require-extension": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 2,
    // "react/wrap-multilines": 1,
    "no-unused-vars": 1,
    "no-extra-bind": 1,
    "no-console": 1,
    "no-debugger": 1,
    "no-inner-declarations": [1, "functions"],
    "max-len": [0, 120],
    "one-var": [1, "never"],
    "eqeqeq": 1,
    "linebreak-style": [0, "windows"],
    "space-before-function-paren": [0, "always"],
    "indent": [0, 2, {"SwitchCase": 1}],
    "padded-blocks": [0, "never"],
    "semi": [1, "always"],
    "comma-dangle": ["warn", "always-multiline"]
  }
};