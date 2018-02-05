FROM node:8.9.4-alpine

RUN apk update
RUN apk add curl
RUN apk add wget

COPY package.json package.json  
RUN npm install

COPY . .  

EXPOSE 3000

CMD ["node","."]
