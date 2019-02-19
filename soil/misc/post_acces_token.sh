#!/bin/bash
echo "Using token: " $1

curl --header "Authorization: Bearer "$1 \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ users { name } }" }' \
  http://localhost:4000/api
