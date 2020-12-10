import React from "react";
import { connect } from "react-redux";

function TabDescriptions(props) {
  return (
    <div className="text-center">
      {props.activeTab === "ActualvsPredicted" ? (
        <p className="font-italic">
          Shows the actual temperatures vs the predicted temperatures for a
          given country by month of the year
        </p>
      ) : (
        <p className="font-italic">
          Shows the difference in average yearly temperatures from the past to
          the future for each country
        </p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.activeTab,
  };
};

export default connect(mapStateToProps)(TabDescriptions);
