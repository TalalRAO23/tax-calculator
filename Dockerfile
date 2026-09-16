# Use a lightweight official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package*.json ./

# Install only production dependencies for a smaller image
RUN npm install --omit=dev

# Copy the rest of the application source
COPY . .

# App listens on this port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
