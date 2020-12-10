import React, { Component } from "react";
import { connect } from "react-redux";
import { Picky } from "react-picky";
import "react-picky/dist/picky.css";
import { getAllCountries } from "../../actions/api/countryData";
import { SET_SELECTED_COUNTRY } from "../../actions/redux/countrySelector";

class CountryDropdownSelector extends Component {
  /**
   * The state object that will hold the state for our CountryDropdownSelector COmponent
   */
  state = {
    selectedCountry: this.props.selectedCountry,
  };

  /**
   * Function to set the state to the new country whenever the value is changed in the dropdown
   * @param {object} value The value that was selected in the dropdown
   */
  handleCountryChange(value) {
    this.setState({
      selectedCountry: value,
    });
    this.props.dispatch({
      type: SET_SELECTED_COUNTRY,
      payload: value,
    });
  }

  /**
   * Function to fetch the list of countries when the CountryDropdownSelector mounts onto the DOM.
   */
  componentDidMount() {
    getAllCountries().then((data) => {
      this.setState({
        countries: data,
      });
    });
  }

  render() {
    return (
      <Picky
        id="countryDropdownSelector"
        valueKey="countryId"
        labelKey="countryName"
        selectAllText="Select All Countries"
        filterPlaceholder="Search Countries..."
        placeholder="Country"
        options={this.state.countries}
        value={this.state.selectedCountry}
        onChange={this.handleCountryChange.bind(this)}
        multiple={false}
        includeSelectAll={false}
        includeFilter={true}
        dropdownHeight={300}
        selectAllMode="filtered"
        render={({
          style,
          isSelected,
          item,
          selectValue,
          labelKey,
          valueKey,
        }) => {
          return (
            <li
              style={style} // required
              className={isSelected ? "selected" : ""} // required to indicate is selected
              key={item[valueKey]} // required
              onClick={() => selectValue(item)}
            >
              {/* required to select item */}
              <input
                type="radio"
                checked={isSelected}
                onClick={() => selectValue(item)}
                id={item[labelKey]}
              />
              <label htmlFor={item[labelKey]}>{item[labelKey]}</label>
            </li>
          );
        }}
      />
    );
  }
}

/**
 * Function to map the central state from our redux store to the props of our Country Selector Component
 * @param {object} state The state object from our redux store
 * @returns {object} The props for our Country Selector Component
 */
const mapStateToProps = (state) => {
  return {
    selectedCountry: state.selectedCountry,
  };
};

export default connect(mapStateToProps)(CountryDropdownSelector);
