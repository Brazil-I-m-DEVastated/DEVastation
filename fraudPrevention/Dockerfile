FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 3002

ENTRYPOINT npm run dev