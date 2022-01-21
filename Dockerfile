FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# node-sass doesn't work well on RaspberryPi
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-72
RUN curl -L https://github.com/sass/node-sass/releases/download/v7.0.1/linux-x64-72_binding.node -o node_modules/node-sass/vendor/linux-x64-72/binding.node

RUN npm install
RUN npm rebuild node-sass

# Bundle app source
COPY . .

RUN npm run client

EXPOSE 8787
CMD [ "node", "bootstrap.js" ]