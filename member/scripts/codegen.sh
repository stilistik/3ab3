#! /bin/bash

echo "Please provide a URL that points to a live api server:"
read url

echo "Please provide a valid access token for the specified URL":
read token

sed -e 's,API_URL,'"$url"',g' \
    -e 's/ACCESS_TOKEN/'"$token"'/g' ./template.yml > ../codegen.yml \
    && yarn generate