FROM node:alpine AS build
WORKDIR /app
COPY ./package.json ./
RUN npm install --production
COPY ./ ./
RUN npm run build
# Choose NGINX as our base Docker image
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=build /app/build .

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]