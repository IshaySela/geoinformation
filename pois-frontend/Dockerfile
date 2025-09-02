# Build stage: node:20-slim has some CVEs, use for development
# only.
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Runtime stage: Use Nginx Alpine
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy build output from Node stage
COPY --from=build /app/dist .

# Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
