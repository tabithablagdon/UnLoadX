FROM node:6.3.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm install
ENV NODE_ENV production

EXPOSE 3000
EXPOSE 4000
