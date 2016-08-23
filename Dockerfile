FROM phusion/passenger-full

RUN curl -O https://bootstrap.pypa.io/get-pip.py
RUN python get-pip.py
RUN pip install awscli

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm install
RUN apt-get update
RUN apt-get install siege
RUN cp -r ~/.aws ~
ENV NODE_ENV production
ENV AWS prod

EXPOSE 3000
EXPOSE 4000
