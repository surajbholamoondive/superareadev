FROM node:18.18-alpine as base
WORKDIR /usr/app
# Install glibc compatibility
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
COPY next.config.js ./
# Install dependencies with legacy-peer-deps flag
RUN npm install --legacy-peer-deps --force

FROM node:18.18-alpine as builder
WORKDIR /usr/app
COPY . .
COPY --from=base /usr/app/node_modules ./node_modules
ARG NODE_ENV=production
RUN echo ${NODE_ENV}

# Enable standalone output mode by updating nextconfig - this is the key fix
RUN sed -i 's/module.exports = {/module.exports = {output: "standalone",/' next.config.js

# Run the build
RUN NODE_ENV=${NODE_ENV} npm run build

FROM node:18.18-alpine AS runner
WORKDIR /usr/app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN apk --no-cache add curl
USER nextjs

# Copy the production build
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/static ./.next/static
COPY --from=builder /usr/app/public ./public

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# Run the standalone server
CMD ["node", "server.js"]
