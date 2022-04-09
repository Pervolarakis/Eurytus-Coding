FROM node:14-alpine AS build
WORKDIR /app
COPY ./package.json ./
RUN npm install
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

# change nginx default config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_conf/nginx.conf /etc/nginx/conf.d/nginx.conf

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]