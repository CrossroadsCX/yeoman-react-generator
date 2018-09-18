from node:9.8.0

run mkdir /usr/src/app

WORKDIR /usr/src/app

RUN yarn add -g yo

RUN yo cx-react --quiet
