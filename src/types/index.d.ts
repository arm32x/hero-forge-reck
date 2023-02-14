declare namespace JSX {
  /**
   * JSX.Element can be different based on pragma in babel config:
   * - VNode   - when jsxFactory is VM.h
   * - DomNode - when jsxFactory is VM.hm
   */
  type Element = import("@gera2ld/jsx-dom").VNode;

  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "*.module.css" {
  /**
   * Generated CSS for CSS modules
   */
  export const stylesheet: string;
  /**
   * Exported classes
   */
  const classMap: {
    [key: string]: string;
  };
  export default classMap;
}

declare module "*.css" {
  /**
   * Generated CSS
   */
  const css: string;
  export default css;
}

declare module "*.svg" {
  const svg: JSX.Element;
  export default svg;
}

