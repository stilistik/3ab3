init:
	yarn --cwd soil/api install
	yarn --cwd soil/prisma install
	cd soil/prisma && prisma deploy

prod:
	docker-compose up --build
