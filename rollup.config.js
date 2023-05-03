import fs from "fs";
import terser from "@rollup/plugin-terser";

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pkg = JSON.parse(fs.readFileSync("./package.json"));

export default [
  {
    input: "main.js",
    output: [
      {
        file: "build/main.cjs",
        format: "cjs",
      },
      {
        file: "build/main.esm.js",
        format: "esm",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: "main.js",
    output: [
      {
        file: "build/main.umd.min.js",
        format: "umd",
        name: firstLetterUpperCase(pkg.name.split("/")[1]),
      },
    ],
    plugins: [terser()],
  },
];
