FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
RUN apk --no-cache add curl
COPY package*.json ./
RUN npm i
COPY tsconfig.json ./
COPY jest.config.ts ./
COPY src src
ARG NODE_ENV

CMD npm run dev