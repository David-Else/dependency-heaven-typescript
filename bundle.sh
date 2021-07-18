#!/bin/bash

clear
esbuild --watch --bundle --minify --sourcemap --format=esm src/mod.ts --outfile=dist/bundle.js &
live-server ./dist &
wait
