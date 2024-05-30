FROM node:lts-alpine

RUN apk --no-cache add curl
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY .eslintrc.json ./
COPY codegen.ts ./
COPY components.json ./
COPY next-env.d.ts ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY lib lib
COPY app app
COPY public public
COPY src src

CMD npm run dev