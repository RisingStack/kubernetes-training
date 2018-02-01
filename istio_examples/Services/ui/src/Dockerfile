FROM node:8.9.4-alpine as build-deps

WORKDIR /usr/src/app

COPY package.json package.json ./
RUN npm install

COPY . .

RUN ["npm", "run" ,"build"]

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

RUN apk update
RUN apk add curl
RUN apk add wget

CMD ["nginx", "-g", "daemon off;"]
