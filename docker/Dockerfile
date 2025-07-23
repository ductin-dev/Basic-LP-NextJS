# Stage 1: Install dependencies only when needed
FROM node:20-alpine AS deps

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init
RUN corepack enable && corepack prepare yarn@4.7.0
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Stage 2: Build the source code only when needed
FROM node:20-alpine AS builder

ARG env
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV BUILD_STANDALONE=true

# Stage 3: Build the application
RUN corepack enable && corepack prepare yarn@4.7.0
RUN yarn build

# Stage 4: Production image
FROM node:20-slim AS runner

WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Stage 5: Install necessary runtime dependencies
USER root
RUN apt-get update && apt-get install -y --no-install-recommends gcc curl && rm -rf /var/lib/apt/lists/*

EXPOSE 3000
CMD ["node", "server.js"]