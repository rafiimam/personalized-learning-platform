const express = require('express');
const connectDB = require('./database/db');

const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware and Routes...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
