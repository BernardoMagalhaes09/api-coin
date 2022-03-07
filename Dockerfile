FROM node:17.5.0

WORKDIR /%HOME/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]