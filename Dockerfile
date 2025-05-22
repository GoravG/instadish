# Build Next.js app
FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production image with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy only the static output from the Next.js build
COPY --from=builder /app/out ./

# Copy custom Nginx config (ensure proper routing for SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
