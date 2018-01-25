FROM node:8.9.4-alpine

ENV PORT 3000

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE $PORT
CMD ["npm", "start"]
