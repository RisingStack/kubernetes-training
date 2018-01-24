FROM node:8.9.4-alpine

ENV PORT 5000

COPY package.json package.json
RUN npm install

COPY . .

CMD ["node", "."]
EXPOSE $PORT
