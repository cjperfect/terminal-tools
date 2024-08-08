import antfu from '@antfu/eslint-config'

export default antfu({
  vue: false,
  react: true,
  typescript: true,
  ignores: [
    '**/public',
  ],
  rules: {
    'style/brace-style': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})
