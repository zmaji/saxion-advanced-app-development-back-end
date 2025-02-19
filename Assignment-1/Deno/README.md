# Prototype 1: Deno

## Description

This project is a back-end prototype built by Nils Kimenai and Maurice ten Teije
using Deno, Oak.js and MySQL as a database. This prototype is designed to run in
a docker container on localhost.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: You should have Docker installed on your system. If not, you can
  download it from
  [Docker's official website](https://www.docker.com/products/docker-desktop/).
- **(Optional) Postman**: To test the API endpoints, you can install
  [Postman](https://www.postman.com/downloads/). Postman is optional, but it
  makes testing easier.

## Getting Started

To get this project up and running, follow these steps:

1. Unzip the project
2. Navigate to the project's root directory
3. Dockerize the back-end application and MySQL database using: 'docker-compose
   build'
4. Run the application using 'docker-compose up'
5. Once the containers are running, you can access the application in your web
   browser at `http://localhost:8080/`.

## Testing endpoints

To test the API endpoints, you can use Postman or access the endpoints in your
web browser.

The following entities are included in this project:

1. Article (/articles)
2. Post (/posts)
3. Comment (/comments)
4. User (/users)

A post can have one or more comments. A comment always belongs to one user.

If you chose to use Postman, you can test these endpoints by importing the
collection file provided in the zip.

1. Click on the hamburger menu in the top left corner.
2. Click on "File" and then "Import.."
3. Choose the Postman collection file (`Deno-Fear-of-Flight.postman_collection`)
