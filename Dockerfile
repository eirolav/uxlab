FROM node:22 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build both applications
RUN npm run build:shell
RUN npm run build:features

# Stage 2: Serve the Shell application with Nginx
FROM nginx:alpine as shell

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/uxlab-shell /usr/share/nginx/html

# Copy custom nginx config
COPY ./projects/uxlab-shell/nginx.conf /etc/nginx/conf.d/default.conf

# Stage 3: Serve the Features application with Nginx
FROM nginx:alpine as features

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/uxlab-features /usr/share/nginx/html

# Copy custom nginx config
COPY ./projects/uxlab-features/nginx.conf /etc/nginx/conf.d/default.conf
