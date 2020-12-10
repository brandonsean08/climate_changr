import "./App.css";
import { connect } from "react-redux";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { getAllActualClimateData } from "./actions/api/climateData";
import BarChart from "./components/Charts/BarChart/BarChart";
import CountryDropdownSelector from "./components/CountrySelector/CountryDropdownSelector";
import NavTabs from "./components/NavTabs/NavTabs";
import TabDescriptions from "./components/NavTabs/TabDescriptions";

function App(props) {
  useEffect(() => {
    getAllActualClimateData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="nav-dropdown-block">
        <NavTabs />
        <TabDescriptions />
        {props.activeTab === "ActualvsPredicted" ? (
          <div className="country-selector">
            <CountryDropdownSelector />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div classname="">
        <BarChart />
      </div>
    </div>
  );
}

/**
 * Function to map the central state from our redux store to the props of our App Component
 * @param {object} state The state object from our redux store
 * @returns {object} The props for our App Component
 */
const mapStateToProps = (state) => {
  return {
    actualClimateData: state.actualClimateData,
    activeTab: state.activeTab,
  };
};

export default connect(mapStateToProps)(App);
