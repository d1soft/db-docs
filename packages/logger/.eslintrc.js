const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  ignorePatterns: ["**/*.js", "**/*.d.ts"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "indent": ["error", 2, {
      VariableDeclarator: 2,
      SwitchCase: 1,
      MemberExpression: 1,
      ArrayExpression: "first"
    }],
    "no-unused-vars": "off",
    "no-console": ["error"],
    "no-irregular-whitespace": ["error", {
      "skipComments": true
    }],
    "@typescript-eslint/keyword-spacing": ["error", {
      "overrides": {
        "if": { "after": true },
        "for": { "after": true },
        "while": { "after": true }
      }
    }],
    "@typescript-eslint/comma-dangle": ["error", {
      "functions": "never",
      "imports": "always-multiline",
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "enums": "always-multiline"
    }],
    "@typescript-eslint/quotes": ["error", "single"],
    "@typescript-eslint/naming-convention": ["error",
      { "selector": "enumMember", "format": ["StrictPascalCase"] },
      { "selector": "variable", "format": ["camelCase", "PascalCase"] },
      { "selector": "parameter", "format": ["camelCase"] },
      { "selector": ["class"], "format": ["PascalCase"] }
    ],
    "@typescript-eslint/ban-types": ["error", {
      "types": {
        "String": {
          "message": "Use string instead",
          "fixWith": "string"
        },
        "{}": {
          "message": "Use object instead",
          "fixWith": "object"
        },
        "object": {
          "message": "The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).",
          "fixWith": "Record<string, unknown>"
        },
        "Number": {
          "message": "Use number instead",
          "fixWith": "number"
        },
        "Boolean": {
          "message": "Use boolean instead",
          "fixWith": "boolean"
        },
        "Function": {
          "message": "The `Function` type accepts any function-like value.\nIt provides no type safety when calling the function, which can be a common source of bugs.\nIt also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.\nIf you are expecting the function to accept certain arguments, you should explicitly define the function shape."
        }
      },
      "extendDefaults": false
    }],
    "@typescript-eslint/prefer-readonly": ["error"],
    "@typescript-eslint/type-annotation-spacing": ["error", {
      "before": false,
      "after": true,
      "overrides": {
        "arrow": {
          "before": true,
          "after": true
        }
      }
    }],
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "@typescript-eslint/space-infix-ops": ["error", { "int32Hint": false }],
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "semi",
        "requireLast": true
      },
      "singleline": {
        "delimiter": "semi",
        "requireLast": false
      }
    }],
    "@typescript-eslint/array-type": ["error", {
      "default": "array-simple"
    }],
    "@typescript-eslint/brace-style": ["error", "1tbs"],
    "@typescript-eslint/comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
    "@typescript-eslint/default-param-last": ["error"],
    "@typescript-eslint/dot-notation": ["error"],
    "@typescript-eslint/explicit-member-accessibility": ["error", {
      "accessibility": "explicit",
      "overrides": {
        "constructors": "no-public",
        "properties": "off"
      }
    }],
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/member-ordering": ["error", {
      "default": [
        "signature",
        "field",
        "constructor",
        "public-method",
        "protected-method",
        "private-method"
      ]
    }],
    "@typescript-eslint/no-duplicate-imports": ["error"],
    "@typescript-eslint/no-empty-function": ["error", { "allow": ["decoratedFunctions"] }],
    "@typescript-eslint/no-empty-interface": ["warn", { "allowSingleExtends": true }],
    "@typescript-eslint/no-for-in-array": ["error"],
    "@typescript-eslint/no-implicit-any-catch": ["error", { "allowExplicitAny": false }],
    "@typescript-eslint/no-implied-eval": ["error"],
    "@typescript-eslint/no-invalid-this": ["error"],
    "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
    "@typescript-eslint/no-non-null-assertion": ["error"],
    "@typescript-eslint/no-parameter-properties": ["error", {
      "allows": ["private readonly", "protected readonly", "private", "protected", "public readonly"]
    }],
    "@typescript-eslint/no-require-imports": ["error"],
    "@typescript-eslint/no-throw-literal": ["error"],
    "@typescript-eslint/no-unnecessary-condition": ["error"],
    "@typescript-eslint/no-unnecessary-type-assertion": ["error"],
    "@typescript-eslint/no-unused-expressions": ["error"],
    // "@typescript-eslint/no-unused-vars-experimental": ["error", {
    //     "ignoreArgsIfArgsAfterAreUsed": true
    // }],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/no-var-requires": ["error"],
    "@typescript-eslint/prefer-for-of": ["error"],
    "@typescript-eslint/prefer-literal-enum-member": ["error"],
    "@typescript-eslint/prefer-optional-chain": ["error"],
    "@typescript-eslint/promise-function-async": ["error"],
    "@typescript-eslint/object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "array-bracket-spacing": ["error", "never"]
  }
};
