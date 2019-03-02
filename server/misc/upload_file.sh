#!/bin/bash

echo "Upload file: " $1

curl localhost:4000/api \
  -F operations='{ "query": "mutation ($file: Upload!) { upload(file: $file) { id filename } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@$1

# curl localhost:8880/api \
#   -H "Authorization: Bearer "$1 \
#   -F operations='{ "query": "mutation ($file: Upload!) { upload(file: $file) { uuid } }", "variables": { "file": null } }' \
#   -F map='{ "0": ["variables.file"] }' \
#   -F 0=@$2
