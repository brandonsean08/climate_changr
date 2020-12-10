/**
 * The fileReader util will read data from our various files that were provided.
 */
const csvtojson = require("csvtojson");
const logger = require("./config/logger");
const actualClimateDataFilePath = "./seed_data/ClimateDataActual.csv";
const predictedClimateDataFilePath = "./seed_data/ClimateChangePrediction.csv";

/**
 * Function to read the csv file that contains the actual climate data.
 * @returns {array} A javascript array containing objects of each data entry.
 */
const readActualSeedClimateData = new Promise(function (resolve, reject) {
  let actualClimateData = csvtojson().fromFile(actualClimateDataFilePath);

  if (actualClimateData.length !== 0) {
    logger.info("Actual Data was retrieved successfully");
    resolve(actualClimateData);
  } else {
    logger.error(
      "An error occurred reading the csv data. Check CSV read functionality."
    );
    reject("An error occurred retrieving the actual climate change data");
  }
});

/**
 * Function to read the csv file that contains the predicted climate data.
 * @returns {array} A javascript array containing objects of each data entry.
 */
const readPredictedSeedClimateData = new Promise(function (resolve, reject) {
  let predictedClimateData = csvtojson().fromFile(predictedClimateDataFilePath);

  if (predictedClimateData.length !== 0) {
    logger.info("Predicted Data was retrieved successfully");
    resolve(predictedClimateData);
  } else {
    logger.error(
      "An error occurred reading the csv data. Check CSV read functionality."
    );
    reject("An error occurred retrieving the predicted climate change data");
  }
});

module.exports = { readActualSeedClimateData, readPredictedSeedClimateData };
