FROM node:20.13.1

WORKDIR /sst-making

COPY . .

RUN npm ci \ 
  && npm install

RUN npm run build --if-present

COPY . .

EXPOSE 3125

CMD ["npm", "run", "start"]