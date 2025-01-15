/** */
import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: Configuration = {
  entry: {
    content: path.resolve(__dirname, "../src/content/content.ts"),
    background: path.resolve(__dirname, "../src/background/background.ts"),
    options: path.resolve(__dirname, "../src/options/options.ts"),
    popup: path.resolve(__dirname, "../src/popup/popup.ts"),
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.(png|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.json$/, type: "json" },
      { test: /\.jsonc$/, use: "jsonc-loader" },
      // prettier-ignore
      { test: /\.ts$/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ["@babel/preset-env", "@babel/preset-typescript"],},},},
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
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
        { from: "src/options/options.css", to: "options.css" },
        // { from: "src/**/*.css", to: "[name][ext]" }
      ],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsonc"],
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

export default config;
