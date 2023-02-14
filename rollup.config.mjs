import path from "path";

import autoprefixer from "autoprefixer";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import userscript from "rollup-plugin-userscript";

// This is technically experimental but I don't care right now!
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      inject: false,
    }),
    nodeResolve(),
    typescript(),
    userscript(path.resolve("src/meta.js"), (meta) =>
      meta
        .replace("${version}", packageJson.version)
        .replace("${author}", packageJson.author)
    ),
  ],
  output: {
    format: "iife",
    file: `dist/${packageJson.name}.user.js`,
    esModule: false,
    externalLiveBindings: false,
  },
};
