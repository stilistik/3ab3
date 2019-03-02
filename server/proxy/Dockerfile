FROM nginx:stable-alpine
LABEL maintainer="Philipp Gerber <philipp@rundumeli.ch>"

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
