init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install

##@ Development

###@ Server 
dev/server.run:		## Runs the development server
	docker-compose -f docker-compose.dev.yml up --build
	
dev/server.reset:		## Resets the database and starts from scratch
	cd server/prisma && prisma reset -f && prisma deploy && prisma seed

dev/server.migrate:		## Deploys the latest changes to the database
	cd server/prisma && prisma deploy

dev/server.force-migrate:		## Forces a migration of changes to the database
	cd server/prisma && prisma deploy --force

###@ Member
dev/member.run: 	## Runs the development client for the interal member app
	cd member && yarn start

dev/member.codegen:		## Runs the codegen for frontend graphql schema types
	cd member/scripts && ./codegen.sh

###@ Server
dev/website.run: 	## Runs the development client for the interal member app
	cd website && yarn dev


##@ Production

###@ Fullstack
prod/all.run:
	docker-compose up --build