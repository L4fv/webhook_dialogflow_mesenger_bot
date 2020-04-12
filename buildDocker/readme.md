# Entornos Docker
# 1.- Entorno Local
docker-compose -f "docker-compose.yml" up -d --build
# 2.- Entorno Desarrollo
docker build --rm -f "buildDocker/development.DockerFile" -t ms-evaluacion-js:1.0 .
docker-compose -f "docker-compose.yml" up -d
# 3.- Entorno Produccion
docker build --rm -f "buildDocker/production.DockerFile" -t ms-evaluacion-js:1.0 .
docker-compose -f "docker-compose.yml" up -d
