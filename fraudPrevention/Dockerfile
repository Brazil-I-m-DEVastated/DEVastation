FROM node:14-alpine

WORKDIR /node-app

COPY . .

RUN npm install

EXPOSE 3002

ENTRYPOINT npm run dev