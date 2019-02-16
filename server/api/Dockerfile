FROM node:carbon
LABEL version="0.0.1"
LABEL maintainer="Philipp Gerber <philipp@rundumeli.ch>"

# Create app directory
WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn

# Copy source
COPY ./src ./src
