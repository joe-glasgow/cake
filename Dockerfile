FROM node:8.7-stretch

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get -qqy install \
    bash \
    nano \
    ca-certificates \
    curl \
    git \
    gnupg \
    gzip \
    libpng-dev \
    nasm \
    openssh-client \
    tar \
    && rm -rf /var/lib/apt/lists/* \
    && touch /root/.profile \

COPY . /app
