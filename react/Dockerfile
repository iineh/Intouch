# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Define environment variable
ENV PORT 3000

# Run the app
CMD ["serve", "-s", "build", "-l", "3000"]
