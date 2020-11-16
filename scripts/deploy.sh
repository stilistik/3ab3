#! /bin/bash

echo "Connecting to server..."
ssh root@newpage.3ab3.ch

echo "Pulling latest changes from master..."
ls
cd ~/3ab3
git checkout master && git pull origin master

echo "Stopping container..."
make prod/all.stop 

echo "Exporting environment"
export $(grep -v '^#' .env | xargs)   

echo "Building ..."
make prod/all.run-rebuild

exit
