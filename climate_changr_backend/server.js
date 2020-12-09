const express = require("express");
const server = express();
server.use(cors());

// For production we want to serve the static files that have been bundled in the public directory of the frontend.
server.use('/', express.static('./climate_changr_frontend/public/build'));

// Importing the winston logger that we have configured.
const logger = require("./config/logger");

// Defining the port as 5000 in development if no environment variable is present.
const PORT = process.env.PORT || 5000;

// Starting the Express server.
server.listen(PORT, () => logger.info(`The server has started at ${new Date()} and is running on port: ${PORT}`));