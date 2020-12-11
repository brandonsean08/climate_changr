import React, { Component } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  getAllActualClimateData,
  getAllPredictedClimateData,
} from "../../../actions/api/climateData";

/**
 * Function to construct the data object required for the chart to render the bars for the actual and predicted data.
 * @param {String} selectedCountry The country that the user wants to view data for
 * @param {Array} actualData The actual temperature data
 * @param {Array} predictedData The predicted temperature data
 */
function constructActualvsPredictedDatasets(
  selectedCountry,
  actualData,
  predictedData
) {
  let indexOfCountryActual = actualData.findIndex(
    (country) => country.country.name === selectedCountry
  );
  let indexOfCountryPredicted = predictedData.findIndex(
    (country) => country.country.name === selectedCountry
  );

  //Setting the actual temperatures dataset
  const predictedTemperaturesDataset = [
    actualData[indexOfCountryActual].country.temperatures.averages.January,
    actualData[indexOfCountryActual].country.temperatures.averages.February,
    actualData[indexOfCountryActual].country.temperatures.averages.March,
    actualData[indexOfCountryActual].country.temperatures.averages.April,
    actualData[indexOfCountryActual].country.temperatures.averages.May,
    actualData[indexOfCountryActual].country.temperatures.averages.June,
    actualData[indexOfCountryActual].country.temperatures.averages.July,
    actualData[indexOfCountryActual].country.temperatures.averages.August,
    actualData[indexOfCountryActual].country.temperatures.averages.September,
    actualData[indexOfCountryActual].country.temperatures.averages.October,
    actualData[indexOfCountryActual].country.temperatures.averages.November,
    actualData[indexOfCountryActual].country.temperatures.averages.December,
  ];

  // Setting predicted dataset
  const actualTemeraturesDataset = [
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .January,
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .February,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.March,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.April,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.May,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.June,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.July,
    predictedData[indexOfCountryPredicted].country.temperatures.averages.August,
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .September,
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .October,
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .November,
    predictedData[indexOfCountryPredicted].country.temperatures.averages
      .December,
  ];

  // Setting the difference dataset
  const differenceInTemperaturesDataset = [
    parseFloat(
      (predictedTemperaturesDataset[0] - actualTemeraturesDataset[0]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[1] - actualTemeraturesDataset[1]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[2] - actualTemeraturesDataset[2]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[3] - actualTemeraturesDataset[3]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[4] - actualTemeraturesDataset[4]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[5] - actualTemeraturesDataset[5]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[6] - actualTemeraturesDataset[6]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[7] - actualTemeraturesDataset[7]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[8] - actualTemeraturesDataset[8]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[9] - actualTemeraturesDataset[9]).toFixed(2)
    ),
    parseFloat(
      (predictedTemperaturesDataset[10] - actualTemeraturesDataset[10]).toFixed(
        2
      )
    ),
    parseFloat(
      (predictedTemperaturesDataset[11] - actualTemeraturesDataset[11]).toFixed(
        2
      )
    ),
  ];

  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        type: "bar",
        label: "Actual Temp",
        backgroundColor: "#89308E",
        borderColor: "#89308E",
        borderWidth: 1,
        hoverBackgroundColor: "#89308E",
        hoverBorderColor: "#89308E",
        data: actualTemeraturesDataset,
      },
      {
        type: "bar",
        label: "Predicted Temp",
        backgroundColor: "#EA1196",
        borderColor: "#EA1196",
        borderWidth: 1,
        hoverBackgroundColor: "#EA1196",
        hoverBorderColor: "#EA1196",
        data: predictedTemperaturesDataset,
      },
      {
        type: "line",
        fill: false,
        label: "Difference Temp",
        backgroundColor: "#2A2E2F",
        borderColor: "#2A2E2F",
        borderWidth: 1,
        hoverBackgroundColor: "#2A2E2F",
        hoverBorderColor: "#2A2E2F",
        data: differenceInTemperaturesDataset,
      },
    ],
  };
}

/**
 * A Fucntion to calculate the yearly average for a country (dataItem) given its monthly averages
 * @param {object} dataItem The dataItem that we want to calculate the yearly avergae for
 */
function calculateYearlyAverage(dataItem) {
  let sum = 0;

  sum += dataItem[0].country.temperatures.averages.January;
  sum += dataItem[0].country.temperatures.averages.February;
  sum += dataItem[0].country.temperatures.averages.March;
  sum += dataItem[0].country.temperatures.averages.April;
  sum += dataItem[0].country.temperatures.averages.May;
  sum += dataItem[0].country.temperatures.averages.June;
  sum += dataItem[0].country.temperatures.averages.July;
  sum += dataItem[0].country.temperatures.averages.August;
  sum += dataItem[0].country.temperatures.averages.September;
  sum += dataItem[0].country.temperatures.averages.October;
  sum += dataItem[0].country.temperatures.averages.November;
  sum += dataItem[0].country.temperatures.averages.December;

  return parseFloat((sum / 12).toFixed(2));
}

/**
 * Function to construct the json object needed by the Bar Chart to display the difference in temperatures
 * @param {array} actualData The actual monthly temperature data
 * @param {array} predictedData The predicted Monthly temperature data
 */
function constructTemperatureDifferenceDatasets(actualData, predictedData) {
  let barChartLabels = [];

  // Creating the list of countries
  actualData.map((country) => {
    barChartLabels.push(country.country.name);
  });

  //Looping through each country and calculating its actual and predicted yearly averges then storing the difference between the
  //two in an object.
  let barChartData = [];
  barChartLabels.map((country) => {
    const predictedDataItem = predictedData.filter((predictedDataCountry) => {
      return predictedDataCountry.country.name === country;
    });
    const actualDataItem = actualData.filter((actualDataCountry) => {
      return actualDataCountry.country.name === country;
    });
    if (actualDataItem.length !== 0 && predictedDataItem.length !== 0) {
      let predictedDataItemYearlyAverage = calculateYearlyAverage(
        predictedDataItem
      );
      let actualDataItemYearlyAverage = calculateYearlyAverage(actualDataItem);
      const differenceInTemp = parseFloat(
        (actualDataItemYearlyAverage - predictedDataItemYearlyAverage).toFixed(
          2
        )
      );

      barChartData.push({
        country: country,
        difference: differenceInTemp,
      });
    }
  });

  // Sort the Country data from largest to smallest
  barChartData.sort(function (a, b) {
    return b.difference - a.difference;
  });

  let sortedLabels = [];
  let sortedValues = [];
  let barChartColors = [];

  barChartData.map((country) => {
    sortedLabels.push(country.country);
    sortedValues.push(country.difference);
    barChartColors.push("#98F5E8");
  });

  // Setting the first bar chart color to be Red as it is the country with the highest difference in temperature
  barChartColors[0] = "red";

  // Setting the last bar chart color to be Blue as it is the country with the smallest difference in temperature
  barChartColors[barChartColors.length - 1] = "blue";

  return {
    labels: sortedLabels,
    datasets: [
      {
        label: "Difference In Temp",
        backgroundColor: barChartColors,
        borderColor: "#98F5E8",
        borderWidth: 1,
        hoverBackgroundColor: "#98F5E8",
        hoverBorderColor: "#98F5E8",
        data: sortedValues,
      },
    ],
  };
}

class BarChart extends Component {
  /**
   * The state object that will hold the state for the Bar Chart Component.
   */
  state = {
    selectedCountry: this.props.selectedCountry,
    activeTab: this.props.activeTab,
    actualClimateData: [],
    predictedClimateData: [],
    barChartDataSets: [],
    barChartOptions: {
      responsive: true,
      legend: {
        display: true,
      },
      type: "bar",
    },
  };

  /**
   * Fetching all of the Actual Data nad Predicted then constructing the datasets required for the Bar Chart.
   */
  componentDidMount() {
    getAllActualClimateData().then((data) => {
      this.setState({
        actualClimateData: data,
      });
      getAllPredictedClimateData().then((data) => {
        this.setState({
          predictedClimateData: data,
        });
        this.setState({
          barChartDataSets: constructActualvsPredictedDatasets(
            this.state.selectedCountry,
            this.state.actualClimateData,
            this.state.predictedClimateData
          ),
        });
      });
    });
  }

  /**
   * Listening for a redux store change in the props
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedCountry.countryName !==
      nextProps.selectedCountry.countryName
    ) {
      this.setState({
        selectedCountry: nextProps.selectedCountry.countryName,
        barChartDataSets: constructActualvsPredictedDatasets(
          nextProps.selectedCountry.countryName,
          this.state.actualClimateData,
          this.state.predictedClimateData
        ),
      });
    }
    if (this.props.activeTab !== nextProps.activeTab) {
      if (nextProps.activeTab === "ActualvsPredicted") {
        this.setState({
          selectedCountry: this.state.selectedCountry,
          barChartDataSets: constructActualvsPredictedDatasets(
            this.state.selectedCountry,
            this.state.actualClimateData,
            this.state.predictedClimateData
          ),
        });
      } else if (nextProps.activeTab === "Change") {
        this.setState({
          activeTab: nextProps.activeTab,
          barChartDataSets: constructTemperatureDifferenceDatasets(
            this.state.actualClimateData,
            this.state.predictedClimateData
          ),
        });
      }
    }
  }

  render() {
    return (
      <div className="bar-chart-container">
        <Bar
          data={this.state.barChartDataSets}
          options={this.state.barChartOptions}
        />
      </div>
    );
  }
}

/**
 * Function to map the central state from our redux store to the props of our Bar Chart Component
 * @param {object} state The state object from our redux store
 * @returns {object} The props for our Bar Chart Component
 */
const mapStateToProps = (state) => {
  return {
    actualClimateData: state.actualClimateData,
    selectedCountry: state.selectedCountry,
    activeTab: state.activeTab,
  };
};

export default connect(mapStateToProps)(BarChart);
