docker build --tag=gym-service:latest .
docker save -o moe-service-1.0.tar gym-service

docker run -p 7172:7172  --name=gym --restart=always gym-service:latest -d