#!/bin/bash

docker stop connectme
docker stop mongodb
docker stop mongoclient

docker rm connectme
docker rm mongodb
docker rm mongoclient