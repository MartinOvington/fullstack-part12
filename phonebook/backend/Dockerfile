FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV PORT=3001

RUN npm ci --only=production

USER node

CMD npm start