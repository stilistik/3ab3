init:
	yarn --cwd soil/api install
	yarn --cwd soil/prisma install

migrations:
	cd server/prisma && prisma reset -f && prisma deploy

member-client: 
	cd member && yarn start

prod-server:
	docker-compose up --build
