FROM maven:3.6.3-jdk-11-slim

COPY . /app

RUN cd /app && mvn package

CMD ["java", "-jar", "/app/target/projet-0.0.0.jar"]
