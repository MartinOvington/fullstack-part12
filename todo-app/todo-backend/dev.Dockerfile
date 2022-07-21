FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV CHOKIDAR_USEPOLLING=true

RUN npm ci

USER node

CMD npm run dev