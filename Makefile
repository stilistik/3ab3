init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install

dev/server:
	docker-compose up --build

dev/reset:
	cd server/prisma && prisma reset -f && prisma deploy

dev/client: 
	cd member && yarn start
