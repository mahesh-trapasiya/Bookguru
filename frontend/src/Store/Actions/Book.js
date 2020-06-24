import axios from "../../Services/axios";
import * as actionTypes from "./ActionTypes";

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    categories,
  };
};

export const fetchCategoriesFailed = (error) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAIL,
    error: error,
  };
};
export const fetchCategoriesStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_START,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    axios
      .get("getcategories")
      .then((response) => dispatch(fetchCategoriesSuccess(response.data)))

      .catch((err) => {
        dispatch(fetchCategoriesFailed(err));
      });
  };
};
