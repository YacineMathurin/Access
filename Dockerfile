FROM node:13.12.0-alpine

# go to app directory
WORKDIR /usr/src/app

COPY . .
RUN ls -al
RUN npm install

EXPOSE 5000
CMD [ "node", "app.js" ]



