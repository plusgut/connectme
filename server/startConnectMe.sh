#!/bin/bash

#docker network create --driver bridge radioNetwork
docker run --name connectme -p 8000:8000 -d connectme:latest