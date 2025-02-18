const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./backend/index.js", // Ensure this path is correct
  output: {
    filename: "bundle.js",
    path: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
    ],
  },
  target: "node",
  mode: "production",
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"], // Provide Buffer globally
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".json"],
    fallback: {
      buffer: require.resolve("buffer/"),
      _http_common: require.resolve("_http_common"),
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
