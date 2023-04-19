FROM node:18
WORKDIR /app

COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY mongo-init.js ./
COPY ./src ./src

RUN mkdir logs
RUN npm install
RUN cd ./src/frontend && npm install && npm run build
RUN cd ../..


CMD ["npm","run", "prod"]

EXPOSE 3000

