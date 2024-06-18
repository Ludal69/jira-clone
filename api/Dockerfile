FROM node:latest AS development

# ENV NODE_ENV=development

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .
# COPY wait-for-it.sh /wait-for-it.sh

RUN npm install
RUN npm install -g typescript pm2 pm2-runtime
RUN npm install --save-dev @types/node @types/reflect-metadata

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN npm run build

# CMD ["sh", "-c", "npm run start:production"]
CMD [ "npm", "run", "start:production" ]