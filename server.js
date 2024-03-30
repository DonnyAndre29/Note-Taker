const express = require('express');
const home_routes = require('./routes/home-routes')
const api_routes = require('./routes/api-routes')


// Create an instance of the express app
const app = express();

// Define a port number
const port = 3000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(home_routes)
app.use(api_routes)


// Start listening on the port
app.listen(port, () => {
  // Log a message to the console
  console.log(`Server is running on http://localhost:${port}`);
});
