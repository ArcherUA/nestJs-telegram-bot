FROM registry.gitlab.com/devs.stargazer/nzbcloud-environment/images/alpine:latest

ADD ./nest-telegram-chat-bot/package.json ./nest-telegram-chat-bot/yarn.lock ./
RUN yarn
COPY ./nest-telegram-chat-bot/ ./
RUN yarn build
EXPOSE 3010

CMD ["docker/start.sh"]