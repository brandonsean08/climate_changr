const rootReducer = require("../reducers/rootReducer");

const testList = ["a", "b", "c"];

describe("App", () => {
  describe("rootReducer", () => {
    it("Should set the Actual Climate Data", () => {
      const state = {
        actualClimateData: [],
        predictedClimateData: [],
        selectedCountry: "United Kingdom",
        activeTab: "ActualvsPredicted",
      };
      const newState = rootReducer(state, {
        type: "SET_ACTUAL_CLIMATE_DATA",
        payload: testList,
      });

      expect(newState).toEqual({
        actualClimateData: testList,
        predictedClimateData: [],
        selectedCountry: "United Kingdom",
        activeTab: "ActualvsPredicted",
      });
    });
  });
});


