// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
      "@typescript-eslint/explicit-member-accessibility": ["warn", {
        accessibility: 'explicit', overrides: { constructors: 'off' },
      }],
      "comma-dangle": ["warn", {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      }],
      "lines-between-class-members": [
        "warn", {
          enforce: [
            { blankLine: "always", prev: "method", next: "*" },
            { blankLine: "always", prev: "*", next: "method" }
          ]
        }
      ],
      "max-len": ["warn", { code: 140 }],
      "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
      "padded-blocks": ["warn", { blocks: "never", classes: "never", }],
      "padding-line-between-statements": ["warn", { blankLine: "always", prev: "*", next: "return" }],
      quotes: ["warn", "single", { allowTemplateLiterals: true }],
      semi: ["warn", "always"],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "max-len": ["warn", { code: 140 }],
      "no-multiple-empty-lines": ["warn", { "max": 1, "maxEOF": 0, "maxBOF": 0 }]
    },
  }
);
