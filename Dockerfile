# Stage 1: Build TypeScript app
FROM node:lts-alpine AS build

WORKDIR /app

# Copy necessary files
COPY package.json .
COPY tsconfig.json .
COPY src ./src

# Install dependencies
RUN npm install

# Build TypeScript
RUN npm run build

# Stage 2: Create production image
FROM node:lts-alpine

WORKDIR /app

# Copy built app from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
