import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"], // since we are transpiling our code to but both "cjs" and "mjs"
  entry: ["src/index.ts"],
  // dts: {
  //   entry: "./src/http-client/types/index.ts",    
  // }, // for our declarations  file
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  splitting: false,
});
