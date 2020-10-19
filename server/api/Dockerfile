FROM node:erbium
LABEL version="0.0.1"
LABEL maintainer="Philipp Gerber <philipp@rundumeli.ch>"

RUN apt-get update -y && apt-get install ghostscript imagemagick -y

# Create app directory
WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn

# Copy source
COPY ./src ./src
