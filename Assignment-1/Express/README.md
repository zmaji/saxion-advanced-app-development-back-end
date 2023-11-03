# Fly With Confidence Backend

## Description

This project is a back-end built by Nils Kimenai and Maurice ten Teije
using Node.js, Express and MongoDB as a database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

**NOTE:** This only applies for running the back-end locally.

- **Docker**: You should have Docker installed on your system. If not, you can
  download it from
  [Docker's official website](https://www.docker.com/products/docker-desktop/).
- **Node.js**: If you don't have Node installed, you can install it by following
  the instructions at
  [Node.js's official website](https://nodejs.org/en).
  With this you can install the application dependencies and run the jest tests.
- **(Optional) Postman**: To test the API endpoints, you can install
  [Postman](https://www.postman.com/downloads/). Postman is optional, but it
  makes testing easier.

## Getting Started

To get this project up and running, follow these steps:

**NOTE:** This only applies for running the back-end locally.

1. Unzip the project
2. Navigate to the project's root directory
3. Dockerize the back-end application and MongoDB database using: 'docker compose build'
4. Run the application using 'docker compose up'
5. Once the containers are running, you can access the application in your web
   browser at `http://localhost:3000/`.

## Running tests
The project includes Jest tests to ensure the API endpoints work as expected. To run these tests, use the following command:
`npm run test`.

To generate test coverage, use following command: `npm run test:coverage`. This will generate a test report in the `coverage` directory in the root. To see this report navigate to the folder then click on `Icov-report` and open `index` in your browser.

## Application Logs
To view the application logs, please create a file called `application.log` inside the Logs directory in the root. This file is needed to write the logs in a clean environment. Unfortunately this step couldn't be automated due to unforseen problems. 

After the application has been dockerized and ran, the logs will be written to this logfile. 

## Linting
To check the code for errors, use the following command: `npm run lint`. To fix any possible problems, use `npm run lint:fix`.

## APIDoc
To generate API documentation, use the following command: `npm run apidoc`. This will generate the documentation in the `apidoc` directory in the root. Navigate towards this directory, then to the `out` directory and open `index` in your browser.
