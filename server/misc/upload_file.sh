#!/bin/bash

echo "Upload file: " $2

curl localhost:4000/api \
  -H "Authorization: Bearer "$1 \
  -F operations='{ "query": "mutation ($file: Upload!) { upload(file: $file) { id filename } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@$2
