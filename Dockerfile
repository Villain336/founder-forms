# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

# Build the app
RUN npm run build

# Install a simple server to show the app
RUN npm install -g serve

# Tell Google Cloud which port to use (Required)
EXPOSE 8080

# Run the app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
