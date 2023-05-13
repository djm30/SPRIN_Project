# Build frontend
FROM node:18 AS build-frontend
WORKDIR /app

COPY ./src/frontend/package.json ./src/frontend/package-lock.json ./
RUN npm install

COPY ./src/frontend .
RUN npm run build

# Build backend
FROM node:18 AS build-backend
WORKDIR /app

COPY .env ./
COPY package.json ./
COPY package-lock.json ./
COPY mongo-init.js ./
COPY ./src ./src
RUN mkdir logs
RUN mkdir ./src/uploads

# Deleting frontend folder to remove unnecessary files
RUN rm -rf ./src/frontend
RUN mkdir ./src/frontend

RUN npm install --omit=dev

# Copying frontend build from previous stage
COPY --from=build-frontend /app/dist ./src/frontend/dist

ENV PORT=80

CMD ["npm","run", "prod"]

EXPOSE 80

VOLUME ["/app/logs", "/app/src/uploads"]
