# Use a base image with the necessary dependencies
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
