init:
	yarn --cwd soil/api install
	yarn --cwd soil/prisma install

deploy:
	cd server/prisma && prisma reset -f && prisma deploy

prod:
	docker-compose up --build
