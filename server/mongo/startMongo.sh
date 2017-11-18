#!/bin/bash

#-v /home/raz/work/mongo/data:/data/db -> to mount external volume
docker run --name mongodb --network radioNetwork -p 27017:27017 -d library/mongo:latest
docker run -d -p 3000:3000 --network radioNetwork --name mongoclient mongoclient/mongoclient

#init db
docker cp init.js mongodb:/tmp
docker exec mongodb mongo /tmp/init.js