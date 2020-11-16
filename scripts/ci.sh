#! /bin/bash

echo "Connecting to server..."
chmod u+x ./scripts/deploy.sh 
ssh root@newpage.3ab3.ch ./scripts/deploy.sh