FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .

EXPOSE 3000
