FROM node:8.9.4-alpine

RUN apk update
RUN apk add curl
RUN apk add wget

ENV PORT 5000

COPY package.json package.json
# DNS doesn't work in the docker container for some reason, so the npm registry is added to hosts by ip
RUN echo "151.101.0.162 registry.npmjs.org" >> /etc/hosts && npm install

COPY . .

CMD ["node", "."]

EXPOSE $PORT
