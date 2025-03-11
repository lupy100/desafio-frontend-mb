module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    'color-hex-length': 'short',
    'color-function-notation': 'modern',
    'alpha-value-notation': 'percentage',
    'selector-class-pattern': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
    'custom-property-empty-line-before': null,
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**'],
};
