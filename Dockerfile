FROM node:16 as builder

WORKDIR /usr/src/app

ARG SERVER_ADDRESS=http://192.168.31.166:8080
ARG SERVER_API_ADDRESS=http://192.168.31.166:8080/api/

ENV VITE_APP_SERVER_ADDRESS=${SERVER_ADDRESS}
ENV VITE_APP_SERVER_API=${SERVER_API_ADDRESS}

RUN mkdir ./dist

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

RUN npm run build



FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 3000