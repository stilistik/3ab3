#! /bin/bash

echo "Connecting to server..."
ssh root@newpage.3ab3.ch "cd 3ab3 && git checkout master && git reset --hard && git pull origin master && ./scripts/deploy.sh"