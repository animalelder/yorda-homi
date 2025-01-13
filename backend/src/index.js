// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(helmet()); // Security
// app.use(cors());   // Cross-Origin Resource Sharing
// app.use(bodyParser.json()); // Parse JSON requests

// // Test route
// app.get('/', (req, res) => {
//     res.send('Backend is working!');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

//this is seconde one


// Import Required Packages


const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
