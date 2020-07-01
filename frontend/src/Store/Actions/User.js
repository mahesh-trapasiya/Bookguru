import axios from "../../Services/axios";
import * as actionTypes from "./ActionTypes";

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
    user: user.user,
  };
};
export const fetchUserFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_FAILED,
    error,
  };
};
export const fetchUserStart = (error) => {
  return {
    type: actionTypes.FETCH_USER_BY_ID_START,
    error,
  };
};

export const addReadLaterFailed = (error) => {
  return {
    type: actionTypes.ADD_READLATER_FAILED,
    error: error,
  };
};
export const addReadLaterSuccess = (data) => {
  return {
    type: actionTypes.ADD_READLATER_SUCCESS,
    data,
  };
};

export const removeReadLaterFailed = (error) => {
  return {
    type: actionTypes.ADD_READLATER_FAILED,
    error: error,
  };
};
export const removeReadLaterSuccess = (data) => {
  return {
    type: actionTypes.ADD_READLATER_SUCCESS,
    data,
  };
};

export const addReadLater = (bookId) => {
  return (dispatch) => {
    axios
      .put(`user/addreadlater/${bookId}`)
      .then((response) => dispatch(addReadLaterSuccess(response.data)))

      .catch((err) => {
        dispatch(addReadLaterFailed(err));
      });
  };
};

export const deleteReadlater = (bookId) => {
  return (dispatch) => {
    axios
      .put(`/user/removereadlater/${bookId}`)
      .then((response) => dispatch(removeReadLaterSuccess(response.data)))

      .catch((err) => {
        dispatch(removeReadLaterFailed(err));
      });
  };
};

export const fetchUserById = (userId) => {
  return (dispatch) => {
    // dispatch(fetchUserStart());
    axios
      .get(`/user/profile/${userId}`)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
      })

      .catch((err) => {
        dispatch(fetchUserFailed(err));
      });
  };
};
