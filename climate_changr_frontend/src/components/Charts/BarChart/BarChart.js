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
        label: "Actual Temp",
        backgroundColor: "#89308E",
        borderColor: "#89308E",
        borderWidth: 1,
        hoverBackgroundColor: "#89308E",
        hoverBorderColor: "#89308E",
        data: [
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .January,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .February,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .March,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .April,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .May,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .June,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .July,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .August,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .September,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .October,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .November,
          predictedData[indexOfCountryPredicted].country.temperatures.averages
            .December,
        ],
      },
      {
        label: "Predicted Temp",
        backgroundColor: "#EA1196",
        borderColor: "#EA1196",
        borderWidth: 1,
        hoverBackgroundColor: "#EA1196",
        hoverBorderColor: "#EA1196",
        data: [
          actualData[indexOfCountryActual].country.temperatures.averages
            .January,
          actualData[indexOfCountryActual].country.temperatures.averages
            .February,
          actualData[indexOfCountryActual].country.temperatures.averages.March,
          actualData[indexOfCountryActual].country.temperatures.averages.April,
          actualData[indexOfCountryActual].country.temperatures.averages.May,
          actualData[indexOfCountryActual].country.temperatures.averages.June,
          actualData[indexOfCountryActual].country.temperatures.averages.July,
          actualData[indexOfCountryActual].country.temperatures.averages.August,
          actualData[indexOfCountryActual].country.temperatures.averages
            .September,
          actualData[indexOfCountryActual].country.temperatures.averages
            .October,
          actualData[indexOfCountryActual].country.temperatures.averages
            .November,
          actualData[indexOfCountryActual].country.temperatures.averages
            .December,
        ],
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

  return parseFloat((sum/12).toFixed(2))
}

/**
 * Function to construct the json object needed by the Bar Chart to display the difference in temperatures
 * @param {array} actualData The actual monthly temperature data
 * @param {array} predictedData The predicted Monthly temperature data
 */
function constructTemperatureDifferenceDatasets(actualData, predictedData) {
  let barChartLabels = [];

  actualData.map((country) => {
    barChartLabels.push(country.country.name);
  });

  let barChartData = [];

  barChartLabels.map((country) => {
    const predictedDataItem = predictedData.filter((predictedDataCountry) => {
      return predictedDataCountry.country.name === country;
    });
    const actualDataItem = actualData.filter((actualDataCountry) => {
      return actualDataCountry.country.name === country;
    });
    if (actualDataItem.length !== 0 && predictedDataItem.length !== 0) {
      let predictedDataItemYearlyAverage = calculateYearlyAverage(predictedDataItem);
      let actualDataItemYearlyAverage = calculateYearlyAverage(actualDataItem);
      const differenceInTemp = parseFloat((predictedDataItemYearlyAverage - actualDataItemYearlyAverage).toFixed(2));

      barChartData.push({
        country: country,
        difference: differenceInTemp,
      });
    }
  });

  //barChartData.sort(function (a, b) {
  //  return b - a;
  //});

  barChartData.sort(function (a, b) {
    return b.difference - a.difference;
  });

  let sortedLabels = [];
  let sortedValues = [];

  barChartData.map((country) => {
    sortedLabels.push(country.country);
    sortedValues.push(country.difference);
  });

  return {
    labels: sortedLabels,
    datasets: [
      {
        label: "Difference In Temp",
        backgroundColor: "#89308E",
        borderColor: "#89308E",
        borderWidth: 1,
        hoverBackgroundColor: "#89308E",
        hoverBorderColor: "#89308E",
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
        console.log(this.state);
        this.setState({
          selectedCountry: this.state.selectedCountry,
          barChartDataSets: constructActualvsPredictedDatasets(
            this.state.selectedCountry,
            this.state.actualClimateData,
            this.state.predictedClimateData
          ),
        });
      } else if (nextProps.activeTab === "Change") {
        console.log(this.state);
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
