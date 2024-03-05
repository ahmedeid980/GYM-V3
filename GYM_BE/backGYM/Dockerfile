#FROM  openjdk:11
FROM adoptopenjdk/openjdk11:ubi
EXPOSE 7172
ARG JAR_FILE=target/GYMWAR.jar
WORKDIR /opt/app
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","app.jar"]