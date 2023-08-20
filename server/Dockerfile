# Dockerfile for React client

# Use the latest LTS version of Node.js
FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm rebuild bcrypt --build-from-source


# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --silent

# Copy all local files to the working directory
COPY . .

# Expose the port that the React app will run on
EXPOSE 8000

# Start the React app
CMD ["npm", "start"]
