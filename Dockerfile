FROM node:13.12.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# RUN git clone --single-branch --branch master --depth 3 https://github.com/YacineMathurin/DBTransfert.git .
COPY . .
RUN ls -al
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# RUN export GOOGLE_APPLICATION_CREDENTIALS="./app-mon-compte-dev-firebase-adminsdk-bazos-1dc8da4864.json"
EXPOSE 5000
CMD [ "node", "index.js" ]



