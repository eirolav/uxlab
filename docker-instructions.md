# Docker Instructions for UXLab Projects

This document provides instructions for building and running the UXLab Shell and Features projects using Docker.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

## Building and Running with Docker Compose (Recommended)

The easiest way to run both projects together is using Docker Compose:

1. Navigate to the root directory of the UXLab project:
   ```
   cd y:\DevWorkshop\uxlab
   ```

2. Build and start both containers:
   ```
   docker-compose up --build
   ```

3. Access the applications:
   - UXLab Shell: http://localhost:4200
   - UXLab Features: http://localhost:4201

4. To stop the containers:
   ```
   docker-compose down
   ```

## Building and Running Individual Projects

### UXLab Shell

1. Navigate to the root directory:
   ```
   cd y:\DevWorkshop\uxlab
   ```

2. Build the Docker image for the shell application:
   ```
   docker build --target shell -t uxlab-shell .
   ```

3. Run the container:
   ```
   docker run -p 4200:80 uxlab-shell
   ```

4. Access the application at http://localhost:4200

### UXLab Features

1. Navigate to the root directory:
   ```
   cd y:\DevWorkshop\uxlab
   ```

2. Build the Docker image for the features application:
   ```
   docker build --target features -t uxlab-features .
   ```

3. Run the container:
   ```
   docker run -p 4201:80 uxlab-features
   ```

4. Access the application at http://localhost:4201

## Additional Information

- The Docker setup uses Nginx to serve the built Angular applications
- Custom Nginx configuration is provided to handle SPA routing
- Static assets are configured with cache headers for better performance
- Both applications are connected via a Docker network for potential inter-service communication
