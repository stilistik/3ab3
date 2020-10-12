init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install

###@ Development

dev/services.run:		## Runs the database and prisma services for development
	docker-compose -f docker-compose.dev.yml up --build prisma postgres 

dev/server.run:		## Runs the development server
	docker-compose -f docker-compose.dev.yml up --build
	
dev/client.run: 	## Runs the development client for the interal member app
	cd member && yarn start

dev/graphql.codegen:		## Runs the codegen for frontend graphql schema types
	cd member/scripts && ./codegen.sh

dev/db.reset:		## Resets the database and starts from scratch
	cd server/prisma && prisma reset -f && prisma deploy && prisma seed

dev/db.migrate:		## Deploys the latest changes to the database
	cd server/prisma && prisma deploy


###@ Production

prod/server.run:
	docker-compose up --build