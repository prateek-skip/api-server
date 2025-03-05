const express = require('express');

const app = express();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const bodyParser = require('body-parser'); // for parsing json
const winston = require('winston'); // for logging



const validApiKey = {
  '030faf4b-f8f0-4c8a-8ad6-c68fed9acb07':"cred",
  'aeded234-800e-4404-9fa6-8e0048dabdc1':"acko",
  "20781877-e1b3-42b6-91f3-ce55318e5115":"verifyu", 
  "affa04c5-99be-4d6b-b549-5ef05092c2fe":"scienaptic",
  "881cd5bb-1f32-4ac7-a39a-7f336deca8e9":"zepto",
  "27d8cfbb-320f-4ccd-879f-f02dab578cd3":"signzy",
  "9d3d35f8-336d-48f3-beef-7c5a71359442":"A23",
  "037b699f-d07d-4ac4-a007-6821923f2c64":"Client1",
  "83dd55ac-bd92-440e-af23-fcddb5de7a10":"Client2",
  "63aaeb2d-9890-4d7a-8643-d5850aff21db":"Client3",
  "7254039b-a84b-4d80-88cb-869b1f10d629":"Client4"
}; // Replace with your actual API key

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

const batchRoute = require('./test/test')


app.use(bodyParser.urlencoded({ extended: false }));
// Middleware
app.use(bodyParser.json());

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
      new winston.transports.File({ filename: 'logs/api-usage-v2.log' })
  ],
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

app.use((req, res, next) => {
  if(req.method === 'GET'){
    
  next(error)
  }
  next()
});




app.use(async (req, res, next) => {
  const startTime = process.hrtime();
  const apiKey = req.header('x-api-key');
  res.on('finish', () => {
      const elapsedTime = process.hrtime(startTime);
      const elapsedTimeInMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;
      logger.info(`Request to ${req.method} ${req.url} by ${validApiKey[apiKey]} took ${elapsedTimeInMs.toFixed(2)} ms`);
  });

  next();
});


// API Key Validation Middleware
const apiKeyValidation = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!validApiKey[apiKey]) {
        logger.warn('Missing API Key in request headers');
        return res.status(401).json({ error: 'Invalid or missing API key. Try again' });
    }
    next();
};

// Apply API Key Validation to all routes
app.use(apiKeyValidation);



app.use('/advance-rc', rcRoutes);
app.use('/challan', challanRoutes);
app.use('/pan',panRoutes);
app.use('/phone',phoneRoutes);
app.use('/bureau',bureauRoutes);
app.use('/aadhar',aadharRoutes);
app.use('/driving-license',dlRoutes);
app.use('/voterID',voterRoutes);
app.use('/passport',passportRoutes);
app.use('/process/rc/batch',batchRoute)


// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error('Endpoint Not Found');
  error.status = 404;
  next(error);
});


app.use((req, res, next) => {
  const userId = req.headers['x-api-key']; // Assume user ID is passed in headers
  const apiPath = req.path;

  if (!userId) {
      logger.warn('Missing API Key in request headers');
      return res.status(400).json({ error: 'User ID is required' });
  }

  const logMessage = `User ${validApiKey[userId]} with API key accessed ${apiPath}`;
  logger.info(logMessage);
  // console.log(logMessage); // Optional: Log to console as well

  next();
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