
const winston = require('winston'); // for logging


  
  // // Middleware to log requests
  // const requestLogger = (req, res, next) => {
  //   const startTime = Date.now();
  //   res.on('finish', () => {
  //     logger.info({
  //       message: 'HTTP Request',
  //       method: req.method,
  //       url: req.originalUrl,
  //       status: res.statusCode,
  //       duration: `${Date.now() - startTime}ms`,
  //       timestamp: new Date().toISOString(),
  //     });
  //   });
  //   next();
  // };
  
  // // Middleware to log errors
  // const errorLogger = (err, req, res, next) => {
  //   logger.error({
  //     message: 'Application Error',
  //     method: req.method,
  //     url: req.originalUrl,
  //     status: res.statusCode,
  //     error: {
  //       message: err.message,
  //       stack: err.stack,
  //     },
  //     timestamp: new Date().toISOString(),
  //   });
  //   next(err);
  // };

  const infoFilter = winston.format((info) => {
    return info.level === 'error' ? false : info;
  });
  
  // Transport for request and response logs (non-error)
  const requestTransport = new winston.transports.File({
    filename: 'logs/aadhaar-requests-20May.log',
    level: 'info',
    format: winston.format.combine(
      infoFilter(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, correlationId, requestBody }) =>
        `${timestamp} [${level}] [${correlationId || 'no-correlation'}] ${message} ${requestBody ? `Body: ${JSON.stringify(requestBody)}` : ''}`
      )
    ),
  });
  
  // Transport for error logs
  const errorTransport = new winston.transports.File({
    filename: 'logs/aadhaar-errors-20May.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, correlationId, requestBody }) =>
        `${timestamp} [${level}] [${correlationId || 'no-correlation'}] ${message} ${requestBody ? `Body: ${JSON.stringify(requestBody)}` : ''}`
      )
    ),
  });

  // const logger = winston.createLogger({
  //   level: 'info',
  //   format: winston.format.combine(
  //     winston.format.timestamp(),
  //     winston.format.json() // Logs as JSON for better readability
  //   ),
  //   transports: [
  //     new winston.transports.Console(),
  //     new winston.transports.File({ filename: 'logs/requests.log', level: 'info' }),
  //     new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
  //   ],
  // });

  const logger = winston.createLogger({
    transports: [requestTransport, errorTransport],
  });



  module.exports = { logger };