# UXLab Micro Frontend Architecture - Docker Production Setup

Complete Angular 20 micro frontend application with Module Federation, authentication, and Docker production deployment.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│          UXLab Shell (Host)         │
│         Port 4200 / 8080            │
│  ┌─────────────────────────────────┐ │
│  │       Authentication            │ │
│  │       Layout & Routing          │ │
│  │       Config Service            │ │
│  └─────────────────────────────────┘ │
│              │                      │
│              ▼                      │
│  ┌─────────────────────────────────┐ │
│  │    Module Federation            │ │
│  │    Remote Loading               │ │
│  └─────────────────────────────────┘ │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│       UXLab Dashboard (Remote)      │
│         Port 4201 / 8081            │
│  ┌─────────────────────────────────┐ │
│  │      Dashboard Module           │ │
│  │      Chart Components           │ │
│  │      Statistics Display         │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🐳 Docker Production Deployment

### Quick Start - Full Stack

```bash
# From /src directory
docker-compose up --build

# Access applications:
# Shell:     http://localhost:8080
# Dashboard: http://localhost:8081
```

### Individual Applications

#### Shell Application (Host)
```bash
cd uxlab-shell
npm run docker:build
npm run docker:run
# Access: http://localhost:8080
```

#### Dashboard Application (Remote)
```bash
cd uxlab-dashboard
npm run docker:build  
npm run docker:run
# Access: http://localhost:8081
```

## 🔧 Development vs Production

| Environment | Shell Port | Dashboard Port | Remote URL |
|-------------|------------|----------------|------------|
| Development | 4200       | 4201           | http://localhost:4201/remoteEntry.js |
| Production  | 8080       | 8081           | http://localhost:8081/remoteEntry.js |

### Development Setup
```bash
# Terminal 1 - Dashboard (Remote)
cd uxlab-dashboard
npm start

# Terminal 2 - Shell (Host)  
cd uxlab-shell
npm start

# Access: http://localhost:4200
```

### Production Setup
```bash
# Single command for full stack
docker-compose up --build

# Or individual containers
docker build -t uxlab-shell ./uxlab-shell
docker build -t uxlab-dashboard ./uxlab-dashboard
docker run -p 8080:80 uxlab-shell
docker run -p 8081:80 uxlab-dashboard
```

## 🔐 Authentication System

Mock OIDC authentication with role-based access:

| Username | Password | Roles | Access |
|----------|----------|-------|--------|
| admin | admin123 | admin, user | Full access + Admin panel |
| user | user123 | user | Standard access |
| john.doe | password | user | Standard access |

### Features
- JWT-like token generation
- Role-based route protection
- HTTP interceptor for API calls
- Session management with localStorage
- Automatic token expiration

## 📁 Project Structure

```
src/
├── uxlab-shell/                 # Host Application
│   ├── Dockerfile              # Multi-stage production build
│   ├── nginx.conf              # NGINX configuration
│   ├── default.conf            # Angular routing config
│   ├── .dockerignore           # Build optimization
│   ├── docker-compose.yml      # Individual service
│   └── src/
│       ├── app/
│       │   ├── auth/            # Authentication components
│       │   ├── guards/          # Route guards
│       │   ├── interceptors/    # HTTP interceptors
│       │   ├── services/        # Auth & Config services
│       │   └── layout/          # Layout component
│       └── ...
├── uxlab-dashboard/             # Remote Application  
│   ├── Dockerfile              # Multi-stage production build
│   ├── nginx.conf              # NGINX configuration
│   ├── default.conf            # Module Federation CORS
│   ├── .dockerignore           # Build optimization
│   ├── docker-compose.yml      # Individual service
│   └── src/
│       └── app/
│           └── dashboard/       # Dashboard module
└── docker-compose.yml          # Full stack orchestration
```

## 🚀 Production Features

### Multi-Stage Docker Build
- **Stage 1**: Node.js 20 Alpine for building Angular apps
- **Stage 2**: NGINX 1.25 Alpine for serving static files

### NGINX Optimizations
- **Gzip Compression**: Reduces transfer size by ~70%
- **Static Asset Caching**: 1-year cache for JS/CSS/images  
- **Security Headers**: XSS, CSRF, and frame protection
- **Health Checks**: Monitoring endpoints at `/health`
- **Module Federation CORS**: Proper headers for micro frontend loading

### Performance Features
- **Build Optimization**: Tree-shaking, minification, bundling
- **Asset Hashing**: Cache busting for deployments
- **Lazy Loading**: Routes and modules loaded on demand
- **Service Workers**: Ready for PWA features

## 🏥 Monitoring & Health Checks

Each container includes health monitoring:

```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' uxlab-shell-prod
docker inspect --format='{{json .State.Health}}' uxlab-dashboard-prod

# Manual health checks
curl http://localhost:8080/health  # Shell
curl http://localhost:8081/health  # Dashboard
```

## 🌐 Module Federation Configuration

### Shell App (webpack.config.js)
```javascript
remotes: {
  "uxlab-dashboard": process.env.DASHBOARD_URL || "http://localhost:4201/remoteEntry.js"
}
```

### Dashboard App (webpack.config.js)  
```javascript
exposes: {
  './DashboardModule': './src/app/dashboard/dashboard-module.ts'
}
```

## 📊 Container Resource Usage

| Container | Base Image | Size | Memory | CPU |
|-----------|------------|------|--------|-----|
| uxlab-shell | nginx:1.25-alpine | ~50MB | ~20MB | <1% |
| uxlab-dashboard | nginx:1.25-alpine | ~45MB | ~15MB | <1% |

## 🔄 CI/CD Ready

The Docker setup is optimized for CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Build Shell
  run: docker build -t uxlab-shell:${{ github.sha }} ./uxlab-shell
  
- name: Build Dashboard  
  run: docker build -t uxlab-dashboard:${{ github.sha }} ./uxlab-dashboard
```

## 🧪 Testing the Setup

1. **Build and Start**: `docker-compose up --build`
2. **Test Shell**: Visit http://localhost:8080
3. **Test Authentication**: Login with `admin` / `admin123`
4. **Test Module Federation**: Navigate to Dashboard
5. **Test Admin Access**: Visit Admin panel (admin users only)
6. **Test Health**: Check http://localhost:8080/health

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Build environment |
| DASHBOARD_URL | http://localhost:4201/remoteEntry.js | Remote entry URL |

## 🎯 Next Steps

- **SSL/TLS**: Add HTTPS with certificates
- **Load Balancing**: Scale with multiple instances
- **API Gateway**: Add backend service integration  
- **Monitoring**: Add Prometheus/Grafana metrics
- **Security**: Add authentication provider integration
