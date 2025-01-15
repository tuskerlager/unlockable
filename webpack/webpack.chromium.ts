import path from "path";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import common from "./webpack.common.js";
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "/dist/chromium"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public/chromium-manifest.json", to: "manifest.json" }],
    }),
  ],
});

export default config;
