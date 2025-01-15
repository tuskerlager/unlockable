const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background/background.js",
    content: "./src/content/content.js",
    popup: "./src/popup/popup.js",
    options: "./src/options/options.js",
  },

  module: {
    rules: [
      // prettier-ignore
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.(png|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.json$/, type: "json" },
      { test: /\.jsonc$/, use: "jsonc-loader" },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/popup/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/options/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/popup/about.html",
      filename: "about.html",
      chunks: [],
    }),
    new CopyPlugin({
      patterns: [
        { from: "_locales", to: "_locales" },
        { from: "src/icons", to: "icons" },
        { from: "src/config/config.jsonc", to: "config.jsonc" },
        { from: "src/config/sites.json", to: "sites.json" },
      ],
    }),
  ],

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },

  resolve: {
    extensions: [".js", ".json", ".jsonc"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@config": path.resolve(__dirname, "config"),
      "@content": path.resolve(__dirname, "src/content"),
      "@popup": path.resolve(__dirname, "src/popup"),
      "@options": path.resolve(__dirname, "src/options"),
      "@background": path.resolve(__dirname, "src/background"),
    },
  },
};
