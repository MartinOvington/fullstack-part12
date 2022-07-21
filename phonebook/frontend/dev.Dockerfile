FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]