FROM node:8

RUN apt install git ruby-full make gcc libc-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN gem install compass --no-rdoc --no-ri
RUN npm install
RUN npm install -g bower
RUN npm install -g grunt-cli
RUN bower install --allow-root
RUN grunt build

CMD [ "node", "server" ]
