# Use official Node.js runtime as a parent image
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (use legacy-peer-deps to avoid peer conflicts)
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Install only production deps
RUN npm ci --only=production || npm install --production

EXPOSE 3000
CMD ["npm", "start"]
