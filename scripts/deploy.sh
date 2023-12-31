#! /bin/bash
set -e
source ~/.nvm/nvm.sh
echo $(node --version)

echo "Pulling latest changes from master..."
git checkout master && git reset --hard && git pull origin master

echo "Stopping containers..."
docker-compose -f docker-compose.prod.yml down

echo "Exporting environment"
export $(grep -v '^#' .env | xargs)   

echo "Packaging and starting services..."
docker-compose -f docker-compose.prod.yml build postgres prisma proxy
docker-compose -f docker-compose.prod.yml up -d postgres prisma proxy 
sleep 10

echo "Running migrations..."
cd server/prisma
prisma deploy
cp -r ./generated ../api/src && cp -r ./generated ../../website
cd ../../

echo "Packaging and starting api server..."
docker-compose -f docker-compose.prod.yml build api
docker-compose -f docker-compose.prod.yml up -d api

echo "Building public website"
cd website
yarn
yarn build
cd ..

echo "Building member client"
cd member
yarn
yarn build
cd ..

echo "Packaging and starting clients"
docker-compose -f docker-compose.prod.yml build member website
docker-compose -f docker-compose.prod.yml up -d member website

exit
