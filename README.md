# Dependency Heaven Typescript

Bundle, test, lint and format TypeScript with only Deno and esbuild. No Node needed!

You only need two executable files to write TypeScript for the browser: [Deno](https://deno.land/) and [esbuild](https://esbuild.github.io/).

- Remember Deno needs file extensions, for example;

```ts
import { example } from "./src/main.ts";
```

These are taken care of by esbuild in the bundling.

There is no need for Node anymore, you can import packages via URL's with their types using `https://cdn.skypack.dev/package-name`

## Bundle and serve TypeScript

Bundle and minify for the browser using Deno and the official esbuild plugin

To build a development bundle from `src/main.ts` and serve to a your default browser on Linux/Mac:

```shell
./build-watch.js
```

- It will rebuild and reload dev server when any file in `./src` is modified
- The contents of `./static-assets` will be copied to the `dist` folder on rebuild

## Test code

run `./test-watch.sh` to execute all tests in the `/test` directory.

Remember Deno has no DOM but many browser compatible API's

## Neovim setup

To run Deno LSP in Neovim 0.5+ with linting and DOM types enabled via `tsconfig.json`:

```lua
nvim_lsp.denols.setup({
  on_attach = on_attach,
  init_options = {
    config = "./tsconfig.json",
    lint = true,
  },
})
```

THANKS to https://github.com/dalcib from https://github.com/evanw/esbuild/issues/802#issuecomment-819579154 for original code.
