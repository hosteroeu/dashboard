FROM digitallyseamless/nodejs-bower-grunt

RUN apk update && apk add --no-cache git ruby-full

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN gem update --system && gem install compass
RUN npm install
RUN npm install bower -g
RUN grunt build

CMD [ "node", "server" ]
