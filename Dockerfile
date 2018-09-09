FROM node:8-alpine

RUN apk update && apk add --no-cache git ruby ruby-dev ruby-bundler ruby-json ruby-irb ruby-rake make gcc libc-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN gem update --system --no-rdoc --no-ri && gem install compass --no-rdoc --no-ri
RUN npm install
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN grunt build

CMD [ "node", "server" ]
