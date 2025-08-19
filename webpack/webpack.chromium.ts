import path from "path";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import common from "./webpack.common.ts";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = merge(common, {
  mode: "production",
  entry: {
    content: path.resolve(__dirname, "../src/content/content.ts"),
    background: path.resolve(__dirname, "../src/background/background.ts"),
    options: path.resolve(__dirname, "../src/options/options.ts"),
    popup: path.resolve(__dirname, "../src/popup/popup.ts"),
  },
  output: {
    path: path.resolve(__dirname, "../dist/chromium"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public/chromium-manifest.json", to: "manifest.json" }],
    }),
  ],
});

export default config;
