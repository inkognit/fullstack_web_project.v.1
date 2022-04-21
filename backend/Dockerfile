FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run clean && npx tsc --build
COPY .env ./dist
WORKDIR ./dist

EXPOSE 3310

CMD node src/server/server.js