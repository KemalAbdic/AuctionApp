FROM node:16-alpine3.17
LABEL maintainer="Kemal Abdić"
LABEL name="Auction App Frontend"
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]