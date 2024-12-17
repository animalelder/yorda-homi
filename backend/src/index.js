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


// Import Required Packages
const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Apply Middlewares
app.use(helmet());              // Secure HTTP headers
app.use(cors());                // Allow Cross-Origin requests
app.use(express.json());        // Built-in JSON parser (replaces body-parser)

// Test Route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Handle 404 Errors
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Global Error Handler (Production-Ready)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
