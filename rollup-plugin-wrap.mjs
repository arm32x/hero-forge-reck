// rollup-plugin-wrap
// https://github.com/rollup/rollup/issues/951#issuecomment-247822991

import { createFilter } from "rollup-pluginutils";
import MagicString from "magic-string";

/**
 * Creates a new instance of `rollup-plugin-wrap`.
 *
 * @param {Object} options The options used to configure the plugin.
 * @returns {import("rollup").Plugin} A Rollup plugin object.
 */
export default function wrap(options) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "wrap",
    transform(code, id) {
      if (!filter(id)) return null;

      const magicString = new MagicString(code)
        .prepend(options.intro(id, code))
        .append(options.outro(id, code));

      return {
        code: magicString.toString(),
        map: magicString.generateMap({ hires: true }),
      };
    },
  };
}
