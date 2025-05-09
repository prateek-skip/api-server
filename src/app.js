const express = require('express');

const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const bodyParser = require('body-parser'); // for parsing json
// const winston = require('winston'); // for logging
const {logger } = require('./api/logger/logger');
const { validApiKey } = require("./config/constants");
//routes 
const rcRoutes = require('./api/routes/rcRoutes');
const challanRoutes = require('./api/routes/challanRoutes');
const panRoutes = require('./api/routes/panRoutes')
const phoneRoutes = require('./api/routes/phoneRoutes')
const bureauRoutes = require('./api/routes/bureauRoutes')
const aadharRoutes = require('./api/routes/aadharRoutes')
const voterRoutes = require('./api/routes/voterRoutes')
const passportRoutes = require('./api/routes/passportRoutes')
const dlRoutes = require('./api/routes/drivingLicenseRoutes')
const batchRoutes = require('./api/routes/batchRoutes')
const uanRoutes = require('./api/routes/uanRoutes')


app.use(bodyParser.urlencoded({ extended: false }));
// Middleware
app.use(bodyParser.json());

// // Create a Winston logger
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.printf(({ timestamp, level, message }) => {
//           return `${timestamp} [${level.toUpperCase()}]: ${message}`;
//       })
//   ),
//   transports: [
//       new winston.transports.File({ filename: 'logs/api-usage-v2.log' })
//   ],
// });

 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use(function(req, res, next) {
  res.set('Server', 'webserver');
  next();
});

app.use((req, res, next) => {
  if(req.method !== "POST"){
    res.status(405).json({
      error: 'Method Not Allowed',
      message: `Only POST requests are allowed.`,
  });
    next(error)
  }
  next()
});



// app.use(async (req, res, next) => {
//   const startTime = process.hrtime();
//   const apiKey = req.header('x-api-key');
//   res.on('finish', () => {
//       const elapsedTime = process.hrtime(startTime);
//       const elapsedTimeInMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;
//       logger.info(`Request to ${req.method} ${req.url} by ${validApiKey[apiKey]} took ${elapsedTimeInMs.toFixed(2)} ms`);
//   });

//   next();
// });



app.use((req, res, next) => {
  const userId = req.headers['x-api-key']; // Assume user ID is passed in headers
  const apiPath = req.path;

  if (!userId) {
      logger.info('Missing API Key in request headers');
      return res.status(400).json({ error: 'API key is required' });
  }

  // const logMessage = `User ${validApiKey[userId]} with API key accessed ${apiPath}`;
  // logger.info(logMessage);
  // console.log(logMessage); // Optional: Log to console as well

  next();
});

// API Key Validation Middleware
const apiKeyValidation = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const apiPath = req.path;
    if (!validApiKey[apiKey]) {
        logger.warn('Missing API Key in request headers');
        return res.status(401).json({ error: 'Invalid or missing API key. Try again' });
    }
    const logMessage = `User ${validApiKey[apiKey]} with API key accessed ${apiPath}`;
    logger.info(logMessage);
    next();
};

// Apply API Key Validation to all routes
app.use(apiKeyValidation);

// app.use(requestLogger);



app.use('/advance-rc', rcRoutes);
app.use('/challan', challanRoutes);
app.use('/pan',panRoutes);
app.use('/phone',phoneRoutes);
app.use('/bureau',bureauRoutes);
app.use('/aadhar',aadharRoutes);
app.use('/driving-license',dlRoutes);
app.use('/voterID',voterRoutes);
app.use('/passport',passportRoutes);
app.use('/batch',batchRoutes);
app.use('/epfo',uanRoutes);
// app.use('/testlink',passportRoutes);


// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error('Endpoint Not Found');
  error.status = 404;
  next(error);
});



app.use((error, req, res, next) => {
  logger.error(error.message, {
    correlationId: req.correlationId,
    requestBody: error,
  })
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message,
      },
  });
});

// app.use(errorLogger); // Logs errors



module.exports = app;