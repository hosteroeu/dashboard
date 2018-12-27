FROM node:8-alpine

RUN apk update && apk add --no-cache git ruby ruby-dev ruby-bundler ruby-json ruby-irb ruby-rake make gcc libc-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN gem install rdoc && gem update --system && gem install compass
RUN npm install
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN bower install --allow-root
RUN grunt build

CMD [ "node", "server" ]
