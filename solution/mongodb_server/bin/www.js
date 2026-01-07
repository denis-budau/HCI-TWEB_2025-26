/**
* Module dependencies.
*/

const http = require('http');
const app = require('../app');
const debug = require('debug')('mongodb_server:server');
const connectDB = require('../databases/database'); // CJS import

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Connect to DB first, then start listening
 */
(async () => {
  try {
    await connectDB(); // wait for MongoDB connection
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const portNum = parseInt(val, 10);

  if (isNaN(portNum)) return val; // named pipe
  if (portNum >= 0) return portNum; // port number
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    break;
    default:
        throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
