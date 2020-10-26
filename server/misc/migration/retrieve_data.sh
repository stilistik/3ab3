#!/bin/bash

LOGIN_URL=https://member.3ab3.ch/login/
YOUR_USER=$1
YOUR_PASS=$2
COOKIES=cookies.txt
CURL_BIN="curl -s -c $COOKIES -b $COOKIES -e $LOGIN_URL"

echo  "Django Auth: Getting CSRF token ..."
$CURL_BIN $LOGIN_URL > /dev/null
DJANGO_TOKEN="csrfmiddlewaretoken=$(grep csrftoken $COOKIES | sed 's/^.*csrftoken\s*//')"

echo "Performing login ..."
$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X POST $LOGIN_URL


echo "Retrieving data ..."

$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X GET https://member.3ab3.ch/api/users/ \
    -o ./generated/users.json

$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X GET https://member.3ab3.ch/api/items/ \
    -o ./generated/items.json

$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X GET https://member.3ab3.ch/api/consumed/ \
    -o ./generated/consumed.json

$CURL_BIN \
    -d "$DJANGO_TOKEN&username=$YOUR_USER&password=$YOUR_PASS" \
    -X GET https://member.3ab3.ch/api/payments/ \
    -o ./generated/payments.json

echo "logout"
rm $COOKIES