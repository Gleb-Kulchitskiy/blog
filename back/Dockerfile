FROM node:14
WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --quiet
RUN npm install -g knex
COPY . ./
