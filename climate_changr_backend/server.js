const express = require("express");
const server = express();
require('dotenv').config()
const cors = require("cors");
const router = require("./routes/app");
server.use(cors());

// Importing the winston logger that we have configured.
const logger = require("./config/logger");

// For production we want to serve the static files that have been bundled in the public directory of the frontend.
server.use('/', express.static('./climate_changr_frontend/public/build'));
// Connecting all of the routes to the server instance
server.use("/", router);

// Importing our firestore databse instance
const database = require("./database_context/firebase");

/**
 * A function to seed the firestore database with the climate data. This method only needs to be called when using a firestore database
 * for the first time. It will read the two files and save the data into the databse and subsequent accessing of data will be done
 * by reading from the DB. This is to avoid storing all of the data in memory.
 */
function seedDatabase() {

}

// Defining the port as 5000 in development if no environment variable is present.
const PORT = process.env.PORT || 5000;

// Starting the Express server.
server.listen(PORT, () => logger.info(`The server has started at ${new Date()} and is running on port: ${PORT}`));

module.exports = server