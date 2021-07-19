#!/bin/bash

clear
deno test --config ./tsconfig.json --watch --allow-all --no-check test/ 
