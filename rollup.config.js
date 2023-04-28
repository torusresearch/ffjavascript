import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

export default {
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
};
