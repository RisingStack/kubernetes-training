FROM node:8.9.4-alpine

RUN apk update
RUN apk add curl
RUN apk add wget

ENV PORT 5000

COPY package.json package.json
RUN npm install

COPY . .

CMD ["node", "."]
EXPOSE $PORT
