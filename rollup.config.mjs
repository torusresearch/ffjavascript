import terser from "@rollup/plugin-terser";
import fs from "fs";

function firstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pkg = JSON.parse(fs.readFileSync("./package.json"));

export default [
  {
    input: "main.js",
    output: [
      {
        dir: "build/lib.cjs",
        format: "cjs",
        preserveModules: true,
      },
      {
        dir: "build/lib.esm",
        format: "esm",
        preserveModules: true,
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
