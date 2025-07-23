# Network
docker network inspect mrsatdev_labs_network >/dev/null 2>&1 || \
docker network create --subnet=172.29.0.0/24 --gateway=172.29.0.1 mrsatdev_labs_network

# Build the new image
docker-compose -f ./docker/docker-compose.yaml build

# Stop and remove the current container
docker stop MrSatDev-Troll
docker rm MrSatDev-Troll

# Deploy the new container with the updated image
docker-compose -f ./docker/docker-compose.yaml -p mrsatdev_labs up -d

# Remove old unused images
docker image prune -f
docker builder prune -a