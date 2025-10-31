import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      // Компоненты в PascalCase, пропсы в camelCase
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false, ignores: ['apexchart'] }],
      'vue/prop-name-casing': ['error', 'camelCase'],
      // Максимум 1 атрибут на строку
      'vue/max-attributes-per-line': ['error', { singleline: 1, multiline: { max: 1 } }],
      // Порядок атрибутов
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL',
          'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT',
        ],
        alphabetical: false,
      }],
      // Перенос содержимого одиночных тегов
      'vue/singleline-html-element-content-newline': ['error', { ignoreWhenEmpty: true, ignores: ['pre', 'textarea'] }],
      'vue/no-setup-props-destructure': 'off',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/migration-from-tailwind-2': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'unused-imports/no-unused-vars': ['error', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
    'unused-imports/no-unused-imports': 'error',
    'import/newline-after-import': 'error',
  },
})
