FROM openjdk:8-jdk-alpine
EXPOSE 8080 3000

RUN apk update && apk upgrade 
RUN apk add nodejs && \
    apk add yarn && \
    apk add maven

COPY . /usr/src/khabu

WORKDIR /usr/src/khabu/front-end
RUN yarn && yarn build

WORKDIR /usr/src/khabu/back-end
RUN mvn clean install
RUN ls

ENTRYPOINT ["java","-jar","/usr/src/khabu/back-end/target/cardgame-0.0.1-SNAPSHOT.jar"]