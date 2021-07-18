import * as esbuild from "https://deno.land/x/esbuild@v0.12.15/mod.js";

esbuild
  .build({
    entryPoints: ["./src/mod.ts"],
    outfile: "./dist/bundle.js",
    format: "esm",
    bundle: true,
    // minify: true,
    sourcemap: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    },
  })
  .then((result, error) => {})
  .catch(() => process.exit(1));
