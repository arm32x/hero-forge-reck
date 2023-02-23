import path from "path";

import autoprefixer from "autoprefixer";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import prettier from "rollup-plugin-prettier";
import userscript from "rollup-plugin-userscript";

import wrap from "./rollup-plugin-wrap.mjs";

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
    cleanup(),
    wrap({
      intro: (absolute) => {
        const relative = path.relative(process.cwd(), absolute);
        return `/* ---- ${relative} ---- */\n`;
      },
      outro: () => "",
    }),
    userscript(path.resolve("src/meta.js"), (meta) =>
      meta
        .replace("${version}", packageJson.version)
        .replace("${author}", packageJson.author)
    ),
    prettier({
      parser: "babel",
    }),
  ],
  output: {
    format: "iife",
    file: `dist/${packageJson.name}.user.js`,
    esModule: false,
    externalLiveBindings: false,
  },
};
