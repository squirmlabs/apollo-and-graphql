import express from 'express';

// Server environment variables
const PORT = process.env.PORT || 3000;

// Express Application
const app = express();

// Running our server
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
