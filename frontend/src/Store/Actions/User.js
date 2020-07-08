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
export const fetchUserReadLaterSuccess = (readLater) => {
  return {
    type: actionTypes.FETCH_USER_READ_LATER_SUCCESS,
    readLater,
  };
};
export const fetchUserReadLaterFailed = (error) => {
  return {
    type: actionTypes.FETCH_USER_READ_LATER_FAILED,
    error,
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
export const userReadLaterBook = () => {
  return (dispatch) => {
    axios
      .get("randomthreebooks")
      .then((response) => {
        dispatch(fetchUserReadLaterSuccess(response.data));
      })

      .catch((err) => {
        dispatch(fetchUserReadLaterFailed(err));
      });
  };
};

export const addBookReadedFailed = (error) => {
  return {
    type: actionTypes.ADD_BOOK_READED_FAILED,
    error: error,
  };
};
export const addBookReadedSuccess = (data) => {
  return {
    type: actionTypes.ADD_BOOK_READED_SUCCESS,
    data,
  };
};

export const addBookReaded = (bookId) => {
  return (dispatch) => {
    axios
      .put("add/book/readed", { bookId })
      .then((response) => {
        dispatch(addBookReadedSuccess(response.data));
      })

      .catch((err) => {
        dispatch(addBookReadedFailed(err));
      });
  };
};

export const fetchRecentThreeBooksReadSuccess = (books) => {
  return {
    type: actionTypes.FETCH_RECENT_THREE_READ_SUCCESS,
    books,
  };
};
export const fetchRecentThreeBooksReadFailed = (error) => {
  return {
    type: actionTypes.FETCH_RECENT_THREE_READ_FAILED,
    error,
  };
};
export const fetchRecentThreeFavoriteBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_RECENT_THREE_FAVORITE_SUCCESS,
    books,
  };
};
export const fetchRecentThreeFavoriteBooksFailed = (error) => {
  return {
    type: actionTypes.FETCH_RECENT_THREE_FAVORITE_FAILED,
    error,
  };
};
export const fetchrandomThreeReadLaterBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_RANDOM_THREE_READLATER_SUCCESS,
    books,
  };
};
export const fetchrandomThreeReadLaterBooksFailed = (error) => {
  return {
    type: actionTypes.FETCH_RANDOM_THREE_READLATER_FAILED,
    error,
  };
};
export const randomThreeBookReadLater = () => {
  return (dispatch) => {
    axios
      .get("/randomthreebooks")
      .then((response) =>
        dispatch(fetchrandomThreeReadLaterBooksSuccess(response.data))
      )
      .catch((error) => dispatch(fetchrandomThreeReadLaterBooksFailed(error)));
  };
};
export const recentThreeBookReads = () => {
  return (dispatch) => {
    axios
      .get("user/recentthreereads")
      .then((response) =>
        dispatch(fetchRecentThreeBooksReadSuccess(response.data))
      )
      .catch((error) => dispatch(fetchRecentThreeBooksReadFailed(error)));
  };
};

export const recentThreeFavoriteBooks = () => {
  return (dispatch) => {
    axios
      .get("user/recentthreefavorites")
      .then((response) =>
        dispatch(fetchRecentThreeFavoriteBooksSuccess(response.data))
      )
      .catch((error) => dispatch(fetchRecentThreeFavoriteBooksFailed(error)));
  };
};
