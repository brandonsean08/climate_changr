/**
 * This file was named app.js as it will contain all of the routes for our app entity. In normal circumstances a different file would be created for 
 * the different entities in our app but in this case we will only have one.
 */
const router = require("express").Router();
const fileReaderUtils = require('../utils/fileReader');
const logger = require("../config/logger");

//Defining the route '/all' which is going to retrieve all of the users
router.route("/actual").get((req, res) => {
        logger.info("All Actual Data is being requested");
        const actualData = fileReaderUtils.readActualSeedClimateData();
        console.log(actualData);
  });

module.exports = router;