FROM node:latest as node
WORKDIR /app

COPY ./ ./usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/GYM /usr/share/nginx/html