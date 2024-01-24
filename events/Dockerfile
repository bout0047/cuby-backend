# Use an official Node runtime as a parent image
FROM node:18.9.0

RUN mkdir -p /usr/src/app

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ./code/package*.json /usr/src/app

# Install any needed packages specified in package.json
RUN npm install

# Copy the contents of the local events directory to the working directory
COPY ./code /usr/src/app

# Set environment variables
ENV NODE_ENV test
ENV DB_HOST events-db

# Make port 3010 available to the world outside this container
EXPOSE 3010

# Run npm install and npm run dev when the container launches
CMD ["npm", "run", "dev"]

