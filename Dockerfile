FROM node:6.3.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm install

EXPOSE 3000
EXPOSE 4000
EXPOSE 5432
