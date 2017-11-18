#!/bin/bash

echo "Cleaning up previous sesstions. Don't worry if you see some errors below. It just means there is nothing to cleanup."
./stopConnectMe.sh

echo "Building ConnectMen docker image..."
docker build -t connectme ./

echo "Creating and starting containsers."
./startConnectMe.sh