#! /bin/bash
echo "Pulling latest changes from master..."
git checkout master && git pull origin master

echo "Stopping containers..."
docker-compose -f docker-compose.prod.yml down

echo "Exporting environment"
export $(grep -v '^#' .env | xargs)   

echo "Packaging and starting services..."
docker-compose -f docker-compose.prod.yml build postgres prisma proxy api
docker-compose -f docker-compose.prod.yml up -d postgres prisma proxy api 

echo "Building member client"
cd member && yarn build 

echo "Building public website"
cd website && yarn build 

echo "Packaging and starting clients"
docker-compose -f docker-compose.prod.yml build member website
docker-compose -f docker-compose.prod.yml up -d member website

exit
