import path from "path";

import autoprefixer from "autoprefixer";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import userscript from "rollup-plugin-userscript";

// This is technically experimental but I don't care right now!
import packageJson from "./package.json" assert { type: "json" };

export default {
  input: "src/index.js",
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      inject: false,
    }),
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
    }),
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
