import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const intialState = {
  error: null,
  loading: false,
  country: "",
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRIES_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_COUNTRIES_SUCCESS:
      return updateObject(state, { country: action.country });

    case actionTypes.FETCH_COUNTRIES_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
