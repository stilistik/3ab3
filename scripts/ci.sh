#! /bin/bash

echo "Connecting to server..."
ssh root@newpage.3ab3.ch "cd 3ab3 && chmod u+x ./scripts/deploy.sh && ./scripts/deploy.sh"