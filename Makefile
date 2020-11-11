init:
	yarn --cwd server/api install
	yarn --cwd server/prisma install
	yarn --cwd member install
	yarn --cwd website install

##@ Development

###@ Server 
dev/server.run:		## Runs the development server
	docker-compose -f docker-compose.dev.yml up --build
	
dev/server.reset:	dev/prisma.reset dev/prisma.distribute

dev/server.migrate: dev/prisma.deploy dev/prisma.distribute

dev/server.force-migrate: dev/prisma.deploy-forced dev/prisma.distribute

dev/prisma.deploy:
	cd server/prisma && prisma deploy

dev/prisma.deploy-forced:
	cd server/prisma && prisma deploy --force

dev/prisma.reset:
	cd server/prisma && prisma reset -f && prisma deploy && prisma seed

dev/prisma.distribute:
	cd server/prisma && cp -r ./generated ../api/src && cp -r ./generated ../../website

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
prod/all.run-rebuild: prod/all.build prod/all.package prod/all.run

prod/all.build: prod/member.build prod/website.build

prod/all.package:
	docker-compose -f docker-compose.prod.yml build

prod/all.run:
	docker-compose -f docker-compose.prod.yml up

prod/member.build:
	cd member && yarn build

prod/website.build:
	cd website && yarn build


prod/all.stop:
	docker-compose -f docker-compose.prod.yml down

