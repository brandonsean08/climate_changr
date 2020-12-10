import React, { Component } from "react";
import { connect } from "react-redux";
import "./NavTabs.css";
import { SET_ACTIVE_TAB } from "../../actions/redux/navTabs";

class NavTabs extends Component {
  /**
   * The state object that will hold the state of our navigation tabs
   */
  state = {
    activeTab: this.props.activeTab,
  };

  /**
   * A function to set the state to the tab that is active (clicked on)
   * @param {String} tabName The name of the tab that was clicked.
   */
  setActiveTab(tabName) {
    this.setState({
      activeTab: tabName,
    });
    this.props.dispatch({
      type: SET_ACTIVE_TAB,
      payload: tabName,
    });
  }

  render() {
    return (
      <div className="row justify-content-center active-tab-nav">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className={
                this.state.activeTab === "ActualvsPredicted"
                  ? "nav-link active"
                  : "nav-link"
              }
              id="actualvspredicted-tab"
              data-toggle="tab"
              href="#actualvspredicted"
              role="tab"
              aria-controls="actualvspredicted"
              aria-selected={this.state.activeTab === "ActualvsPredicted"}
              onClick={() => this.setActiveTab("ActualvsPredicted")}
            >
              Actual vs Predicted
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                this.state.activeTab === "Change"
                  ? "nav-link active"
                  : "nav-link"
              }
              id="change-tab"
              data-toggle="tab"
              href="#change"
              role="tab"
              aria-controls="change"
              aria-selected={this.state.activeTab === "Change"}
              onClick={() => this.setActiveTab("Change")}
            >
              Change
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

/**
 * Function to map the central state from our redux store to the props of our NavTabs Component
 * @param {object} state The state object from our redux store
 * @returns {object} The props for our NavTabs Component
 */
const mapStateToProps = (state) => {
  return {
    activeTab: state.activeTab,
  };
};

export default connect(mapStateToProps)(NavTabs);
