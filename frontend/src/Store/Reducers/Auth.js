import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const intialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  response: "",
  data: "",
  message: "",
  verification: false,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });

    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, { loading: false });

    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null });

    case actionTypes.SIGNUP_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.SIGNUP_SUCCESS:
      return updateObject(state, {
        message: action.userData.data ? action.userData.data.message : "",
        error: action.userData.error,
        verification: true,
      });
    case actionTypes.SIGNUP_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.VERIFY_CODE_SUCCESS:
      return updateObject(state, {
        message: action.userData.data ? action.userData.data.message : "",
        error: action.userData.error,
      });
    case actionTypes.VERIFY_CODE_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return updateObject(state, {
        message: action.data.data ? action.data.data.message : "",
        error: action.data.error,
      });
    case actionTypes.FORGOT_PASSWORD_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return updateObject(state, {
        message: action.data.data ? action.data.data.message : "",
        error: action.data.error,
      });

    case actionTypes.RESET_PASSWORD_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};
export default reducer;
