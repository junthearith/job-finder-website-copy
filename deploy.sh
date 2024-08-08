#!/bin/bash
# Ensure the script fails if any command fails
set -e

# Prompt the user to enter a unique container name or generate one based on timestamp
read -p "Enter a name container or press enter to use a timestamp-based name: " CUSTOM_CONTAINER_NAME
if [ -z "$CUSTOM_CONTAINER_NAME" ]; then
    CONTAINER_NAME="my_container_$(date +%s)"
else
    CONTAINER_NAME="$CUSTOM_CONTAINER_NAME"
fi

# Prompt the user for Docker Hub credentials
read -p "Enter your Docker Hub username: " USERNAME
read -sp "Enter your Docker Hub password: " PASSWORD
echo  # This echo command is to move to the next line after password input

# Prompt for Docker repository and tag
read -p "Enter the Docker repository name (e.g., username/repository): " REPOSITORY
read -p "Enter the tag for your Docker image (e.g., latest, 1.0): " TAG

# Log in to Docker Hub
echo "Logging into Docker Hub..."
echo $PASSWORD | docker login -u "$USERNAME" --password-stdin

# Set and export the environment variables for Docker Compose
export REPOSITORY
export TAG

# Build the Docker image using Docker Compose
echo "Building the Docker image..."
docker compose build

# Push the Docker image
echo "Pushing image to Docker Hub..."
docker push $REPOSITORY:$TAG

# Check if a container with the specified name already exists
if [ $(docker ps -aq -f name=^$CONTAINER_NAME$) ]; then
    echo "Container with name $CONTAINER_NAME already exists. Stopping and removing..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
echo "Running the Docker container..."
docker run -d -p 8086:80 --name $CONTAINER_NAME $REPOSITORY:$TAG