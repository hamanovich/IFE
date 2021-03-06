module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",

    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],

    "rules": {
        "comma-dangle": ["error", "never"],
        "linebreak-style": ["error", "windows"],
        "no-shadow": 0,
        "no-console": 0,
        "no-case-declarations": 0,
        "camelcase": 0,
        "import/prefer-default-export": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-boolean-value": 2,
        "react/jsx-curly-spacing":  [2, "never"],
        "react/jsx-indent-props": 1,
        "react/jsx-indent": [1, 2],
        "react/forbid-prop-types": [2, { "forbid": ["any"] }],
        "react/jsx-key": 2,
        "react/jsx-max-props-per-line": [2, {maximum: 3}],
        "react/jsx-no-bind": [2, {
            "ignoreRefs": true,
            "allowBind": true,
            "allowArrowFunctions": true
        }],
        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-undef": 2,
        "react/jsx-pascal-case": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/no-danger": 2,
        "react/no-deprecated": 2,
        "react/no-did-mount-set-state": 0,
        "react/no-did-update-set-state": 0,
        "react/no-direct-mutation-state": 2,
        "react/no-is-mounted": 2,
        "react/no-multi-comp": 2,
        "react/no-string-refs": 2,
        "react/no-unknown-property": 2,
        "react/prefer-es6-class": 2,
        "react/prefer-stateless-function": 0,
        "react/prop-types": 2,
        "react/react-in-jsx-scope": 2,
        "react/self-closing-comp": 2,
        "react/sort-comp": [2, {
            "order": [
                "lifecycle",
                "/^handle.+$/",
                "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
                "everything-else",
                "/^render.+$/",
                "render"
            ]
        }],
        "react/jsx-wrap-multilines": 2
    },
    "globals":{
        "$": true,
        "document": true,
        "window": true,
        "localStorage": true
    }
};