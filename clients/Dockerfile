FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 3001

ENTRYPOINT npm run dev