FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 7000

USER node

CMD ["npm", "start"]