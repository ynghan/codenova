FROM gradle:8.13-jdk17 as build
WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle ./gradle
RUN if [ ! -f ./gradlew ]; then gradle wrapper --stacktrace --gradle-version 8.13; fi


COPY src ./src

RUN ./gradlew build --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/build/libs/Backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
