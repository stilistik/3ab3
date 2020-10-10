init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install

dev/services.run:
	docker-compose -f docker-compose.dev.yml up --build prisma postgres 

dev/server.run:
	cd server/api && yarn start:dev

dev/server.reset:
	cd server/prisma && prisma reset -f && prisma deploy && prisma seed

dev/server.migrate:
	cd server/prisma && prisma deploy

dev/client.run: 
	cd member && yarn start

prod/server.run:
	docker-compose up --build

