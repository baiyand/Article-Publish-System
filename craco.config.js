const path = require('path')

module.exports = {
  webpack: {
    alias: {
      // use @ to represent src path
      '@': path.resolve(__dirname, 'src')
    }
  }
}