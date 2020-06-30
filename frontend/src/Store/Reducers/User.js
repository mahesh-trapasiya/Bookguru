import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_BY_ID_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_USER_BY_ID_SUCCESS:
      return updateObject(state, { user: action.user, loading: false });
    case actionTypes.FETCH_USER_BY_ID_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.ADD_READLATER_SUCCESS:
      return updateObject(state, action);
    case actionTypes.ADD_READLATER_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.REMOVE_READLATER_SUCCESS:
      return updateObject(state, action);
    case actionTypes.REMOVE_READLATER_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    default:
      return state;
  }
};

export default reducer;
