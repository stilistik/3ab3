#!/bin/bash

curl localhost:4000/api \
  -H "Authorization: Bearer "$1 \
  -F operations='{ "query": "mutation ($input: EmailInput!) { sendEmail(input: $input) { from to subject } }", "variables": { "input": { "to":"philipp@rundumeli.ch", "from":"admin@3ab3.ch", "subject":"test", "text":"test email sending!!" } } }' \
  -F map='{}' \