const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./src/js/main.js"
  },
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};