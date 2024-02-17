ARG VARIANT=latest
FROM oven/bun:${VARIANT}

RUN apt-get update \
    && apt-get -y install --no-install-recommends git nano \
    && apt-get auto-remove -y \
    && apt-get clean -y

VOLUME ~/.gitconfig:/home/bun/.gitconfig

USER bun
