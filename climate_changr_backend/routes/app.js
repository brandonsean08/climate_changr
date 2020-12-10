/**
 * This file was named app.js as it will contain all of the routes for our app entity. In normal circumstances a different file would be created for
 * the different entities in our app but in this case we will only have one.
 */
const router = require("express").Router();
const fileReaderUtils = require("../fileReaderUtil");
const logger = require("../config/logger");
const monthsOfTheYear = require("../constants/monthConstants");
const { v4: uuidv4 } = require('uuid');

/**
 * Function to extract a list of all of the countries and populate another list in a json format for readability and accessibility
 * @param {list} actualMonthlyTemperatureData All of the monthly temperature data
 */
function extractListOfCountriesFromDataset(actualMonthlyTemperatureData) {
  let countryList = [];

  actualMonthlyTemperatureData.map((monthlyDataItem) => {
    if (
      !countryList.some(
        (country) => country.country.name === monthlyDataItem.Country
      )
    ) {
      let countryItem = {
        country: {
          name: monthlyDataItem.Country,
          ISO3: monthlyDataItem.ISO3,
          temperatures: {
            raw: {
              January: [],
              February: [],
              March: [],
              April: [],
              May: [],
              June: [],
              July: [],
              August: [],
              September: [],
              October: [],
              November: [],
              December: [],
            },
            averages: {
              January: 0,
              February: 0,
              March: 0,
              April: 0,
              May: 0,
              June: 0,
              July: 0,
              August: 0,
              September: 0,
              October: 0,
              November: 0,
              December: 0,
            },
          },
        },
      };
      countryList.push(countryItem);
    }
  });

  return countryList;
}

/**
 * Function to populate the list of countries with their monthly data in a json object.
 * @param {array} countryList
 * @param {array} allMonthlyData
 */
function populateCountryMonthlyTemperatures(countryList, allMonthlyData) {
  allMonthlyData.map((monthlyDataItem) => {
    indexOfCountryToPopulate = countryList.findIndex(
      (country) => country.country.name === monthlyDataItem.Country
    );

    if (monthlyDataItem.Statistics === "Jan Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.January.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Feb Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.February.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Mar Average") {
      countryList[indexOfCountryToPopulate].country.temperatures.raw.March.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Apr Average") {
      countryList[indexOfCountryToPopulate].country.temperatures.raw.April.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "May Average") {
      countryList[indexOfCountryToPopulate].country.temperatures.raw.May.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Jun Average") {
      countryList[indexOfCountryToPopulate].country.temperatures.raw.June.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Jul Average") {
      countryList[indexOfCountryToPopulate].country.temperatures.raw.July.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Aug Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.August.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Sep Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.September.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Oct Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.October.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Nov Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.November.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
    if (monthlyDataItem.Statistics === "Dec Average") {
      countryList[
        indexOfCountryToPopulate
      ].country.temperatures.raw.December.push(
        parseFloat(monthlyDataItem.Temperature)
      );
    }
  });

  populateMonthlyAverages(countryList);

  return countryList;
}

/**
 * A generic function to work out the average of any list of numbers.
 * @param {array} listToAverage The list that we want to work out the average of.
 */
function calculateAverage(listToAverage) {
  var sum = listToAverage.reduce(function (a, b) {
    return a + b;
  }, 0);

  return parseFloat((sum / listToAverage.length).toFixed(2));
}

/**
 * A function to populate the average temperature of each country for each month of the year.
 * @param {array} countryList The list of countries with their raw monthly temperature data
 */
function populateMonthlyAverages(countryList) {
  countryList.map((country) => {
    country.country.temperatures.averages.January = calculateAverage(country.country.temperatures.raw.January);
    country.country.temperatures.averages.February = calculateAverage(country.country.temperatures.raw.February);
    country.country.temperatures.averages.March = calculateAverage(country.country.temperatures.raw.March);
    country.country.temperatures.averages.April = calculateAverage(country.country.temperatures.raw.April);
    country.country.temperatures.averages.May = calculateAverage(country.country.temperatures.raw.May);
    country.country.temperatures.averages.June = calculateAverage(country.country.temperatures.raw.June);
    country.country.temperatures.averages.July = calculateAverage(country.country.temperatures.raw.July);
    country.country.temperatures.averages.August = calculateAverage(country.country.temperatures.raw.August);
    country.country.temperatures.averages.September = calculateAverage(country.country.temperatures.raw.September);
    country.country.temperatures.averages.October = calculateAverage(country.country.temperatures.raw.October);
    country.country.temperatures.averages.November = calculateAverage(country.country.temperatures.raw.November);
    country.country.temperatures.averages.December = calculateAverage(country.country.temperatures.raw.December);
  });
  return countryList;
}

/**
 * A function to clean the dataset and format it as an easy to manipulate json object.
 * @param {array} rawData The list of all of the monthly temperature data
 */
function cleanDataset(rawData) {
  let countryList = extractListOfCountriesFromDataset(rawData);
  return populateCountryMonthlyTemperatures(countryList, rawData);
}

/**
 * "/data/actual/all" returns all of the actual monthly temperature data
 */
router.route("/data/actual/all").get((req, res) => {
  logger.info("All Actual Data is being requested");

  fileReaderUtils.readActualSeedClimateData.then(function (
    actualMonthlyTemperatureDataRaw
  ) {
    const cleanedData = cleanDataset(actualMonthlyTemperatureDataRaw);
    res.send(cleanedData);
  });
});

/**
 * "/data/predicted/all" returns all of the predicted monthly temperature data
 */
router.route("/data/predicted/all").get((req, res) => {
  logger.info("All Predicted Data is being requested");
  fileReaderUtils.readPredictedSeedClimateData.then(function (
    predictedMonthlyTemperatureDataRaw
  ) {
    const cleanedData = cleanDataset(predictedMonthlyTemperatureDataRaw);
    res.send(cleanedData);
  });
});

/**
 * "/countries/all" returns a list of all of the countries
 */
router.route("/countries/all").get((req, res) => {
  fileReaderUtils.readActualSeedClimateData.then(function (
    actualMonthlyTemperatureDataRaw
  ) {
    let countries = [];
    actualMonthlyTemperatureDataRaw.map(monthlyDataItem => {
      if(!countries.some(country => country.countryName === monthlyDataItem.Country)) {
        countries.push({
          countryId: uuidv4(),
          countryName: monthlyDataItem.Country
        })
      }
    })
    res.send(countries);
  });
});

module.exports = router;
