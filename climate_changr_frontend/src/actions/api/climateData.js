import axios from "axios";

/**
 * Asynchronous function to retrieve all of the Actual Climate Data for all of the countries
 */
export const getAllActualClimateData = async () => {
  try {
    const response = await axios.get("/data/actual/all");
    const responseClimateData = await response.data;
    return responseClimateData;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Asynchronous function to retrieve all of the Predicted Climate Data for all of the countries
 */
export const getAllPredictedClimateData = async () => {
    try {
      const response = await axios.get("/data/predicted/all");
      const responseClimateData = await response.data;
      return responseClimateData;
    } catch (err) {
      console.log(err);
    }
  };
