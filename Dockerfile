FROM node:16 as builder

WORKDIR /usr/src/app

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