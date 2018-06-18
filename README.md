# Cakes

Welcome to Cakes

## Starting Up

This app runs on [Docker](https://docs.docker.com/) for ease of portability regardless of deployment platform.
If you have Docker and Docker CLI please follow the instructions below to get started.
First build the Docker environment using the following command from inside this repo's root directory.
    `Docker build .`

Then the cake app can be composed using the following command:
    `docker-compose up`

This will build the app, through `npm`, `gulp` and finally `webpack` transpilation on a NodeJS server.
This process will take a few minutes and the command line will show the access URLs once completed - The app will be running on your [localhost](http://localhost:3000)
*NB* The app uses the (BrowserSync)[https://www.browsersync.io/] plugin extension (e.g for chrome) which is useful for development changes.

Future improvements:

Further unit tests, end to end testing. Server Side rendering (for case of browser refresh, SEO considerations)