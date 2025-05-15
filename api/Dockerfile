FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY src src

COPY data data

COPY ./jest.config.ts .

COPY tests tests

EXPOSE 4000

CMD ["npm", "run", "full"]