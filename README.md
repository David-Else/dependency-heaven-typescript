# Dependency Heaven Typescript 

You only need two executable files to write TypeScript for the browser: Deno and esbuild.

## Bundle and serve TypeScript for the browser using Deno and the official esbuild plugin

To build a development bundle from `src/main.ts` and serve to a your default browser:

```
deno run -A --unstable build-watch.js
```

- It will rebuild and reload dev server when any file in `./src` is modified
- The contents of `./static-assets` will be copied to the `dist` folder on rebuild

## Neovim setup

To run Deno LSP in Neovim 0.5+ with linting and DOM types enabled via `tsconfig.json`:

```
nvim_lsp.denols.setup({
  on_attach = on_attach,
  init_options = {
    config = "./tsconfig.json",
    lint = true,
  },
})
```

THANKS to https://github.com/dalcib from https://github.com/evanw/esbuild/issues/802#issuecomment-819579154 for original code.
