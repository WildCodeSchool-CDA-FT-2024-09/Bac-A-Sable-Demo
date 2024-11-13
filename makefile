stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af

loc:
	docker compose -f docker-compose.test.yml up --build -d

dev:
	docker compose -f docker-compose.dev.yml up --build -d
