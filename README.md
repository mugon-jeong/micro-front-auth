### cli

```bash
docker network create front_network

# Build dev
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yaml build

# Up dev
docker-compose -f docker-compose.yaml up -d
```
