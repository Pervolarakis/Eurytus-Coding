FROM node:alpine
RUN apk add build-base
RUN apk add openjdk8
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV PATH="$JAVA_HOME/bin:${PATH}"
RUN java -version
RUN javac -version
WORKDIR /app
COPY ./package.json ./
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]