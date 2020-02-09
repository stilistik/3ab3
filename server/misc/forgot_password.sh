#!/bin/bash
email="email="$1

curl -X POST -d $email http://localhost:4000/oauth/forgot_password