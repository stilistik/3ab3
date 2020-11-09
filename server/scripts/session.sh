#!/bin/bash

email="&email="$1
maintenance_password="&password="$2
credentials=$email$maintenance_password
echo "Sending request..."
URL=$(curl -X POST -d $credentials http://localhost:4000/auth/session)
xdg-open $URL
echo ""