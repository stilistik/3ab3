#!/bin/bash

echo "Username: " $1
echo "Password: " $2

username="&username="$1
password="&password="$2
credential="grant_type=password"$username$password
echo $credential

curl --user Ng37FZ3ZtZ5MvaKJsJdbqWKdP87IMPDtpa/izWqtB5BDZZ8myPzsPAWpO0bEaPMV:JNtTf4T+lag= \
 -X POST -d $credential http://localhost:4000/oauth/token
