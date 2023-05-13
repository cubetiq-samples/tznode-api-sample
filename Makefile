IMAGE_NAME=tznode-api:latest

build:
	docker build -t $(IMAGE_NAME) .