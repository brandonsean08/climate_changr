import axios from "axios";

/**
 * Asynchronous function to retrieve all of the Country Data
 */
export const getAllCountries = async () => {
  try {
    const response = await axios.get("/countries/all");
    const responseCountryData = await response.data;
    return responseCountryData;
  } catch (err) {
    console.log(err);
  }
};
