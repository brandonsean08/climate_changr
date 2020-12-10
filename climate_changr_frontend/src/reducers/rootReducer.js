/**
 * For the purpose of this application we will only have one reducer. In a larger application there will be mutiple reducers for the
 * different entities
 */

/**
 * The initial state of our application
 */
const initState = {
  actualClimateData: [],
  predictedClimateData: [],
  selectedCountry: "United Kingdom",
  activeTab: "ActualvsPredicted",
};

/**
 * Function to change the state of our apllication and update the store
 * @param {object} state The state to set
 * @param {object} action The action defining which part of our state to change
 */
export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "SET_ACTUAL_CLIMATE_DATA":
      return {
        ...state,
        actualClimateData: action.payload,
      };
    case "SET_PREDICTED_CLIMATE_DATA":
      return {
        ...state,
        predictedClimateData: action.payload,
      };
    case "SET_SELECTED_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload,
      };
    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
}
