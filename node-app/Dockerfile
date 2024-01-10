FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the server files
COPY server.js .

# Expose port 3000
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
