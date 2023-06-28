FROM node:current-alpine

ENV PNPM_HOME=/usr/local/bin

RUN corepack enable

RUN SHELL=bash pnpm setup \
&& source ~/.bashrc

RUN pnpm add -g @nestjs/cli

EXPOSE 3333

WORKDIR /src

CMD [ "pnpm", "--version" ]