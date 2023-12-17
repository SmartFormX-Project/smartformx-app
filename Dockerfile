# Use an official Node.js LTS version as the base image
FROM node:14-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create a minimal image for production
FROM node:14-alpine

# Set the working directory in the second stage
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Expose the application port
EXPOSE 3000

# Run the application in production mode
CMD ["npm", "app"]
