# IN APPS/BACKEND/DOCKERFILE

# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy the backend's package.json and the root lockfile
COPY apps/backend/package.json pnpm-lock.yaml ./

# Use pnpm to install dependencies
RUN npm install -g pnpm
RUN pnpm fetch
# In a monorepo, you must install using --filter to get only backend dependencies
# This is a critical optimization
RUN pnpm install --filter backend  

# Copy the backend's source code
COPY apps/backend/. .

RUN pnpm run build

# Stage 2: Create the production image
FROM node:18-alpine
WORKDIR /usr/src/app
# Globally install pnpm
RUN npm install -g pnpm

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
# --- ADD THIS LINE --- Copy the lockfile to the final stage
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./

# Install production dependencies using pnpm's content-addressable store
RUN pnpm fetch
# Use --filter here as well for a clean install
RUN pnpm install --filter backend  

COPY --from=builder /usr/src/app/dist ./dist
# Expose the application port
EXPOSE 3000
# Command to run the application
CMD ["node", "dist/main"]