echo "Using email: " $1

email="email="$1

curl -X POST -d $email http://localhost:4000/auth/passwordless/request