module.exports = {
  root: true,
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  plugins: [],
  ignorePatterns: ['node_modules/', '.next/', 'out/'],
};
