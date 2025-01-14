const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist/chromium"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public/chromium-manifest.json",
          to: "manifest.json",
        },
      ],
    }),
  ],
});
