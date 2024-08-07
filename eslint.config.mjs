import antfu from '@antfu/eslint-config'

export default antfu({
  vue: false,
  react: true,
  typescript: true,
  ignores: [
    '**/public',
  ],
})
