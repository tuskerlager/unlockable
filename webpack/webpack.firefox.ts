import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common.ts";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from "webpack";

const config: Configuration = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist/firefox"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public/firefox-manifest.json", to: "manifest.json" }],
    }),
  ],
});

export default config;
