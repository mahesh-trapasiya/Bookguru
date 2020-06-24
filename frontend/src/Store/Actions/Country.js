import axios from "../../Services/axios";
import * as actionTypes from "./ActionTypes";

export const fetchCountrySuccess = (country) => {
  return {
    type: actionTypes.FETCH_COUNTRIES_SUCCESS,
    country,
  };
};

export const fetchCountryFailed = (error) => {
  return {
    type: actionTypes.FETCH_COUNTRIES_FAIL,
    error: error,
  };
};
export const fetchCountryStart = () => {
  return {
    type: actionTypes.FETCH_COUNTRIES_START,
  };
};

export const fetchCountries = () => {
  return (dispatch) => {
    axios
      .get("countries")
      .then((response) => dispatch(fetchCountrySuccess(response.data)))

      .catch((err) => {
        dispatch(fetchCountryFailed(err));
      });
  };
};
