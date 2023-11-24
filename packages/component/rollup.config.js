import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from "rollup-plugin-dts";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default [{
  input: "src/index.ts",
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs'
    },
    {
      file: './lib/esm/index.js',
      format: 'esm'
    }
  ],
  plugins:[
    peerDepsExternal(),
    resolve(),
    typescript({tsconfig: "./tsconfig.json"}),
    postcss({
      plugins: [tailwindcss, autoprefixer],
    }),
    commonjs(),
    image(),
    terser(),]
},
{
  input: "lib/esm/index.d.ts",
  output: [{ file: "lib/index.d.ts", format: "esm" }],
  plugins: [dts()],
  external: [/\.css$/, /\.scss$/],
},
];