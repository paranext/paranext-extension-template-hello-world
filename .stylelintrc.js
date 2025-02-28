module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-sass-guidelines'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    // Disable Stylelint's indentation control
    '@stylistic/indentation': null,
    // Let Prettier handle selector list formatting
    '@stylistic/selector-list-comma-newline-after': null,
    'color-named': null,
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
  },
};
