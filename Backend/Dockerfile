FROM node:24.20.0-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 4000

FROM base AS development
COPY . .
CMD [ "npm", "run", "dev" ]

FROM base AS production
COPY . .
RUN npm prune --production
CMD [ "npm", "run", "start" ]