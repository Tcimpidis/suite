module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', '@typescript-eslint', 'prefer-arrow'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['build', 'dist'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'no-undef': {
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 'warn',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/default': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'react/forbid-dom-props': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'warn',

    camelcase: 'warn',
    'id-match': 'warn',
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'error',
    'no-warning-comments': 'warn',
    'no-case-declarations': 'off',
    'react/display-name': 2,
    'react/prefer-stateless-function': [2, { ignorePureComponents: true }],
    'react/jsx-props-no-spreading': 'off',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/order': [
      1,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'react/jsx-curly-brace-presence': ['warn'],
    'prefer-destructuring': [
      2,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'react/jsx-no-useless-fragment': [1],
    'react/forbid-elements': [2, { forbid: ['br'] }],
    'react/jsx-sort-props': [2],
    'react/boolean-prop-naming': [2],
    'react/self-closing-comp': [2],
    'react/jsx-boolean-value': [2, 'always'],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        classPropertiesAllowed: true,
        singleReturnOnly: true,
      },
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'no-multiple-empty-lines': [1, { max: 1, maxEOF: 0 }],
    'react/react-in-jsx-scope': 'off',
    'import/namespace': [
      'error',
      {
        allowComputed: true,
      },
    ],
  },
};
