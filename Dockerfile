FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT $PORT
ENV TEST_HOST $TEST_HOST
ENV NODE_ENV $NODE_ENV
ENV HOST_NAME $HOST_NAME
ENV DATABASE_HOST $DATABASE_HOST
ENV DATABASE_PORT $DATABASE_PORT
ENV DATABASE_NAME $DATABASE_NAME
ENV DATABASE_USERNAME $DATABASE_NAME
ENV DATABASE_PASSWORD $DATABASE_PASSWORD

# Install app dependencies
COPY package.json .
RUN npm install
RUN apt-get update
RUN apt-get -y install lsof

COPY . .
RUN ["chmod", "+x", "./start.sh"]

EXPOSE 1337
CMD [ "npm", "start" ]
