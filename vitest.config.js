const path = require('path')

module.exports = {
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, './') + '/' },
      { find: '@', replacement: path.resolve(__dirname, './') },
    ],
  },
}
