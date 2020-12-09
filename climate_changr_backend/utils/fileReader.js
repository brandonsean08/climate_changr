/**
 * The fileReader util will read data from our various files that were provided.
 */
const csvtojson = require("csvtojson");
const actualClimateDataFilePath = '../seed_data/ClimateDataActual.csv';
const predictedClimateDataFilePath = '../seed_data/ClimateChangePrediction.csv';
 /**
 * Function to read the csv file that contains the actual climate data.
 * @returns {array} A javascript array containing objects of each data entry.
 */
const readActualSeedClimateData = () => {
    csvtojson().fromFile(actualClimateDataFilePath).then(actualDataJsonObject => {
        return actualDataJsonObject;
    })
}

/**
 * Function to read the csv file that contains the predicted climate data.
 * @returns {array} A javascript array containing objects of each data entry.
 */
const readPredictedSeedClimateData = () => {
    csvtojson().fromFile(predictedClimateDataFilePath).then(predictedDataJsonObject => {
        return predictedDataJsonObject;
    })
}

module.exports = {readActualSeedClimateData, readPredictedSeedClimateData};

