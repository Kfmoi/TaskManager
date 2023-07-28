# Dockerfile for React client

# Use the latest LTS version of Node.js
FROM node:14-alpine

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --silent

# Copy all local files to the working directory
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
