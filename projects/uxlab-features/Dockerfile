FROM node:22 as build

WORKDIR /app

# Copy package.json and package-lock.json from root
COPY ../../package*.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace
COPY ../.. .

# Build the features application
RUN npm run build:features

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/uxlab-features /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
