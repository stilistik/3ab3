init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install

dev/server.run:
	docker-compose up --build

dev/server.reset:
	cd server/prisma && prisma reset -f && prisma deploy && prisma seed

dev/server.migrate:
	cd server/prisma && prisma deploy

dev/client.run: 
	cd member && yarn start
