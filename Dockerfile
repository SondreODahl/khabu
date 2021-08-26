FROM openjdk:8-jdk-alpine
EXPOSE 8080 2222

ENV SSH_PASSWD "root:Docker!"
RUN apk update && apk upgrade && \
    apk add dialog && \
    apk add --no-cache openssh-server && \
    apk add openrc && \
    echo "$SSH_PASSWD" | chpasswd
COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

RUN apk add --update nodejs && \
    apk add yarn && \
    apk add maven
COPY ./front-end/package.json /usr/src/khabu/front-end/
WORKDIR /usr/src/khabu/front-end
RUN yarn --ignore-engines

COPY . /usr/src/khabu
RUN yarn build

WORKDIR /usr/src/khabu/back-end
RUN mvn clean install

ENTRYPOINT [ "init.sh" ]
