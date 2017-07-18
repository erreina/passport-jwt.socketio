module.exports = {
    "extends": "airbnb-base",
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      }
    },
    "rules": {
      "no-param-reassign": [2, { "props": false }],
      "global-require": 0,
      "no-underscore-dangle": 0,
      "no-warning-comments": 1,
      "no-constant-condition": 0,
      "max-len": ["error", 150],
      "no-else-return": 0, 
      "arrow-body-style": 0,
      "react/no-multi-comp": 0,
      "import/first": 0,
      "import/prefer-default-export": 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
    },
};
