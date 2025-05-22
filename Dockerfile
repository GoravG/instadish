# Build Next.js app
FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production image with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built Next.js files (entire .next, not just static)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
