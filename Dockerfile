# Use Microsoft's official Playwright base image
FROM mcr.microsoft.com/playwright:v1.34.0-jammy

# Copy the current directory contents into the container at /app
COPY . /app

# Set the working directory to /app
WORKDIR /app

# Install dependencies
RUN npm install

# Add npm bin to path (for npx command)
ENV PATH /app/node_modules/.bin:$PATH

# Run the tests
CMD ["npm", "run", "test:regression"]
