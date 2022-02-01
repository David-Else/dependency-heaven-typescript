#!/usr/bin/env -S deno run --allow-all --unstable

import { serve } from "./deps.ts";
import { copySync } from "./deps.ts";

// https://github.com/evanw/esbuild/issues/802#issuecomment-819579154
import * as esbuild from "https://deno.land/x/esbuild@v0.12.29/mod.js";

const clients = [];

esbuild
  .build({
    entryPoints: ["./src/main.ts"],
    outfile: "./dist/bundle.js",
    bundle: true,
    format: "esm",
    minify: true,
    sourcemap: true,
    banner: {
      js:
        ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();',
    },
    watch: {
      onRebuild(error, result) {
        copySync("./src/static-assets", "./dist", { overwrite: true });
        clients.forEach((res) => res.write("data: update\n\n"));
        clients.length = 0;
        console.log(error ? error : "...");
      },
    },
  })
  .then((result, error) => {})
  .catch(() => process.exit(1));

esbuild.serve({ servedir: "./" }, {}).then(() => {
  serve(async (req) => {
    const { url, method, headers } = req;
    if (url === "/esbuild") {
      req.write = (data) => {
        req.w.write(new TextEncoder().encode(data));
        req.w.flush();
      };
      req.write(
        "HTTP/1.1 200 OK\r\nConnection: keep-alive\r\nCache-Control: no-cache\r\nContent-Type: text/event-stream\r\n\r\n",
      );
      return clients.push(req);
    }
    const path = ~url.split("/").pop().indexOf(".") ? url : `/index.html`; //for PWA with router
    const res = await fetch("http://localhost:8000" + path, {
      method,
      headers,
    });
    const text = await res.text();
    await req.respond({
      body: text,
      statusCode: res.statusCode,
      headers: res.headers,
    });
  }, { port: 3000 });

  setTimeout(() => {
    const open = {
      darwin: ["open"],
      linux: ["xdg-open"],
      windows: ["cmd", "/c", "start"],
    };
    if (clients.length === 0) {
      Deno.run({ cmd: [...open[Deno.build.os], "http://localhost:3000"] });
    }
  }, 2000); //open the default browser only if it is not opened yet
});
