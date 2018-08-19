FROM node:9.8.0

RUN mkdir /usr/src/app

COPY package.json /tmp/package.json
RUN cd /tmp && yarn --quiet
RUN cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN ["npm", "run", "build"]

EXPOSE 8000
