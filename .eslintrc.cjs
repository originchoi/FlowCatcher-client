module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.spec.jsx"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "./tailwind.config.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "no-param-reassign": 0,
    "no-underscore-dangle": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        some: ["nesting", "id"],
      },
    ],
    "react/no-array-index-key": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-empty-interface": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
