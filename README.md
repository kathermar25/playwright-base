# 🚀 Playwright base project 🚀

This is a comprehensive boilerplate project for end-to-end testing with Playwright. It's designed to provide a solid starting point for professional web testing projects, saving you the effort of setting up the basic project structure, configuration, and tools.. This project uses [TypeScript](https://www.typescriptlang.org/) for static typing and [Playwright](https://playwright.dev/) for end-to-end testing. 🎭

## 🌐 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 🔑 Prerequisites

You need to have:  
[Node.js](https://nodejs.org/)  
[yarn](https://yarnpkg.com/) (which comes with Node.js) installed on your machine to run this project.  
[Docker](https://www.docker.com/products/docker-desktop) (if you intend to use the Docker features)

### 💽 Installing

1.  Clone the repo:

        `git clone https://github.com/kathermar25/playwright-base.git`

2.  Navigate into the directory:

        `cd playwright-base`

3.  Install dependencies

        `yarn install`

## 🧪 Running the Tests

You can run the tests using the following command:

`yarn test:regression`

## 🐳 Docker

We also provide a Dockerfile for running the tests in a Docker container.

To build the Docker image, run:

    `docker build -t playwright-tests .`

To run the tests in a Docker container, use:

    `docker run playwright-tests`

## 📁 Project Structure

The tests are organized using the Page Object Model. Each page of the web application has a corresponding Page Object, which abstracts the interaction with the web page.

## 🔄 Continuous Integration

We use GitHub Actions for Continuous Integration. This allows us to run the tests on every push to the main branch, ensuring that our application is always in a working state.

## 👥 Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
