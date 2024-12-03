const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//routes 
const authorsRoutes = require('./api/routes/authors');
const booksRoutes = require('./api/routes/books');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Middleware
app.use(bodyParser.json());

// API Key Validation Middleware
const apiKeyValidation = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validApiKey = '6666-8888-999'; // Replace with your actual API key

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Invalid or missing API key. Try again' });
    }
    next();
};

// Apply API Key Validation to all routes
app.use(apiKeyValidation);



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
app.use('/books', booksRoutes);

 

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