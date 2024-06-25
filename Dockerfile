# Stage 1: Build TypeScript app
FROM node:lts-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files
COPY pnpm-lock.yaml ./
COPY package.json .
COPY tsconfig.json .
COPY prisma ./prisma
COPY src ./src

# Install dependencies using pnpm
RUN pnpm install

# # Generate Prisma client
# RUN pnpm prisma generate

# Build TypeScript
RUN pnpm run build

# Stage 2: Create production image
FROM node:lts-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy built app from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
# COPY --from=build /app/pnpm-lock.yaml ./
# COPY --from=build /app/prisma ./prisma

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "start"]
