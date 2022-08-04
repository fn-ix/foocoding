'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // use switch...case as if-block shorthand to check for different request values
    switch (request.url) {
      // in case request url is '/state', set response status to OK, response data type to JSON and JSON.stringify the object containing the state value
      case '/state':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
          state: state
        }));
        break;
      // same as before, but begin with incrementing state value
      case '/add':
        state += 1;
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
          state: state
        }));
        break;
      // same as before, but begin by decrementing state value
      case '/subtract':
        state -= 1;
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
          state: state
        }));
        break;
      // same as before, but set state value to the original 10
      case '/reset':
        state = 10;
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
          state: state
        }));
        break;
      // return a not found error in the form of a JSON string for all other addresses
      default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
          error: 'Not found'
        }));
    }
  });

  return server;
}

module.exports = {
  createServer
};
