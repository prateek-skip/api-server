const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const validApiKey = {'030faf4b-f8f0-4c8a-8ad6-c68fed9acb07':"cred",'aeded234-800e-4404-9fa6-8e0048dabdc1':"acko"}; // Replace with your actual API key
//routes 
const authorsRoutes = require('./api/routes/authors');
const challanRoutes = require('./api/routes/challan');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Middleware
app.use(bodyParser.json());

// API Key Validation Middleware
const apiKeyValidation = (req, res, next) => {
    const apiKey = req.header('x-api-key');



    if (!validApiKey[apiKey]) {
        return res.status(401).json({ error: 'Invalid or missing API key. Try again' });
    }
    next();
};

// Apply API Key Validation to all routes
app.use(apiKeyValidation);


// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      })
  ),
  transports: [
      new winston.transports.File({ filename: 'logs/api-usage.log' })
  ],
});

app.use((req, res, next) => {
  const userId = req.headers['x-api-key']; // Assume user ID is passed in headers
  const apiPath = req.path;

  if (!userId) {
      logger.warn('Missing API Key in request headers');
      return res.status(400).json({ error: 'User ID is required' });
  }

  const logMessage = `User ${validApiKey[userId]} with API key ${userId} accessed ${apiPath}`;
  logger.info(logMessage);
  // console.log(logMessage); // Optional: Log to console as well

  next();
});


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



app.use('/advance-rc', authorsRoutes);
app.use('/challan', challanRoutes);


// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error('Endpoint Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message,
      },
  });
});


module.exports = app;