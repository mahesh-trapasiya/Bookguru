import axios from "../../Services/axios";
import * as actionTypes from "./ActionTypes";
import { navigate } from "@reach/router";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (response) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    response,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const signupSuccess = (userData) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    userData: userData,
  };
};
export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error,
  };
};
export const VerifyCodeSuccess = (userData) => {
  return {
    type: actionTypes.VERIFY_CODE_SUCCESS,
    userData,
  };
};
export const verifyCodeFailed = (error) => {
  return {
    type: actionTypes.VERIFY_CODE_FAILED,
    error: error,
  };
};
export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };

    await axios
      .post("auth/signin", authData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.error) {
          dispatch(authFail(response.data.error));
        } else {
          dispatch(authSuccess(response));
          typeof window !== undefined &&
            localStorage.setItem("auth", JSON.stringify(response.data.user));
          if (response.data.user.role === "Reader") {
            navigate("/");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const onSignup = (data) => {
  return (dispatch) => {
    dispatch(signupStart());
    axios
      .post("auth/signup", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        dispatch(signupSuccess(response));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const verifyCode = (data) => {
  return (dispatch) =>
    axios
      .put("auth/verifyotp", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        dispatch(VerifyCodeSuccess(response));
        navigate("/success");
      })
      .catch((err) => {
        dispatch(verifyCodeFailed(err.response.data.error));
      });
};
