import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const intialState = {
  error: null,
  loading: false,
  categories: "",
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return updateObject(state, { categories: action.categories.categories });
    case actionTypes.FETCH_CATEGORIES_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
