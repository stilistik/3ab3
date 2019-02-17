init:
	yarn --cwd soil/api install
	yarn --cwd soil/prisma install
	cd soil/prisma && prisma deploy

reset:
	cd soil/prisma && prisma reset -f

prod:
	docker-compose up --build
