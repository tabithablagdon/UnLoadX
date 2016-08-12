FROM node:6.3.1
MAINTAINER: UnLoadX <aebrownz11@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm install

EXPOSE 3000
EXPOSE 4000
