module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: ['@herp-inc', '@herp-inc/eslint-config-node'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'node'],
    rules: {
        '@typescript-eslint/naming-convention': 'off',
        'node/no-extraneous-import': 'off',
        'node/no-missing-import': 'off',
    },
};
