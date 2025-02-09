# Use the official Node.js image
FROM node

# Set the working directory
WORKDIR /app

# 
RUN apt-get update && apt-get install -y telnet

# Copy the entire application code into the container
COPY . .

# Install dependencies
RUN npm install

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose the app port
EXPOSE 3000

# Set the entrypoint to the script
ENTRYPOINT ["/app/entrypoint.sh"]
