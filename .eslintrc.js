module.exports = {
  // "root": true,
  env: {
    browser: true,
    // "es2021": true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],
    'no-param-reassign': ['off'],
    'import/prefer-default-export': ['off'],
  },
};
