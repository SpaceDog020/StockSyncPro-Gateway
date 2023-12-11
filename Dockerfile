FROM node:18.16.1

WORKDIR /usr/src/app

COPY ["package.json","package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]