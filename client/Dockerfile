FROM node:latest AS development

# ENV NODE_ENV=development

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g pm2 pm2-runtime

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start:production"]