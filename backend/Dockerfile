FROM maven:3.8.6-openjdk-11-slim AS build
LABEL maintainer="Kemal Abdić"
LABEL name="Auction App Backend"
COPY ./pom.xml pom.xml
COPY ./src src/
RUN mvn clean install -DskipTests

FROM fabric8/java-alpine-openjdk11-jre
COPY --from=build target/AuctionApp-0.0.1-SNAPSHOT.jar AuctionApp-0.0.1-SNAPSHOT.jar
EXPOSE 3000
ENTRYPOINT ["java", "-jar", "/AuctionApp-0.0.1-SNAPSHOT.jar"]
