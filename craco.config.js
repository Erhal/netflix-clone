const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      styles: path.join(__dirname, 'src/assets/styles'),
    },
  },
};
