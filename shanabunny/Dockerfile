# Base image for build
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy entire project, including .env
COPY . .

# Build the app (reads .env if needed)
RUN npm run build

# Runtime image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy runtime assets from builder
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.env ./.env

# Start the Next.js app
CMD ["npm", "start"]
