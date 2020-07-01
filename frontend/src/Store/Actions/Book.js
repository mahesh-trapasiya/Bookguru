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
export const fetchBookByIdSuccess = (book) => {
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_SUCCESS,
    book,
  };
};

export const fetchBookByIdFailed = (error) => {
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_FAILED,
    error: error,
  };
};
export const fetchBookByIdStart = () => {
  return {
    type: actionTypes.FETCH_BOOK_BY_ID_START,
  };
};
export const fetchBookByUserIdSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOK_USER_BY_ID_SUCCESS,
    books,
  };
};

export const fetchBookByUserIdFailed = (error) => {
  return {
    type: actionTypes.FETCH_BOOK_USER_BY_ID_FAILED,
    error: error,
  };
};
export const fetchBookByUserIdStart = () => {
  return {
    type: actionTypes.FETCH_BOOK_USER_BY_ID_START,
  };
};

export const addBookSuccess = (book) => {
  return {
    type: actionTypes.ADD_BOOK_SUCCESS,
    book,
  };
};

export const addBookFailed = (error) => {
  return {
    type: actionTypes.ADD_BOOK_FAILED,
    error: error,
  };
};
export const addBookStart = () => {
  return {
    type: actionTypes.ADD_BOOK_START,
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
export const addCommentSuccess = (comment) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    comment,
  };
};

export const addCommentFailed = (error) => {
  return {
    type: actionTypes.ADD_COMMENT_FAILED,
    error: error,
  };
};
export const addLikeSuccess = (data) => {
  return {
    type: actionTypes.ADD_LIKE_SUCCESS,
    data,
  };
};

export const addLikeFailed = (error) => {
  return {
    type: actionTypes.ADD_LIKE_SUCCESS,
    error: error,
  };
};
export const removeLikeSuccess = (data) => {
  return {
    type: actionTypes.REMOVE_LIKE_SUCCESS,
    data,
  };
};

export const removeLikeFailed = (error) => {
  return {
    type: actionTypes.REMOVE_LIKE_SUCCESS,
    error: error,
  };
};
export const addDisLikeSuccess = (data) => {
  return {
    type: actionTypes.ADD_DISLIKE_SUCCESS,
    data,
  };
};

export const addDisLikeFailed = (error) => {
  return {
    type: actionTypes.ADD_DISLIKE_FAILED,
    error: error,
  };
};
export const removeDisLikeSuccess = (data) => {
  return {
    type: actionTypes.REMOVE_DISLIKE_SUCCESS,
    data,
  };
};

export const removeDisLikeFailed = (error) => {
  return {
    type: actionTypes.REMOVE_DISLIKE_FAILED,
    error: error,
  };
};

export const fetchBookById = (bookId) => {
  return (dispatch) => {
    dispatch(fetchBookByIdStart());
    axios
      .get(`book/${bookId}`)
      .then((response) => dispatch(fetchBookByIdSuccess(response.data)))

      .catch((err) => {
        dispatch(fetchBookByIdFailed(err));
      });
  };
};
export const fetchBooksByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchBookByUserIdStart());
    axios
      .get(`book/by/${userId}`)
      .then((response) => dispatch(fetchBookByUserIdSuccess(response.data)))

      .catch((err) => {
        dispatch(fetchBookByUserIdFailed(err));
      });
  };
};
export const addUserBook = (data) => {
  return (dispatch) => {
    axios
      .post(`user/addbook`, data)
      .then((response) => dispatch(addBookSuccess(response.data)))

      .catch((err) => {
        dispatch(addBookFailed(err));
      });
  };
};

export const addBookComment = (data) => {
  return (dispatch) => {
    axios
      .put(`book/comment`, data)
      .then((response) => dispatch(addCommentSuccess(response.data)))

      .catch((err) => {
        dispatch(addCommentFailed(err));
      });
  };
};

export const addBookLike = (data) => {
  return (dispatch) => {
    axios
      .put(`book/like`, data)
      .then((response) => dispatch(addLikeSuccess(response.data)))

      .catch((err) => {
        dispatch(addLikeFailed(err));
      });
  };
};
export const removeBookLike = (data) => {
  return (dispatch) => {
    axios
      .put(`book/unlike`, data)
      .then((response) => dispatch(removeLikeSuccess(response.data)))

      .catch((err) => {
        dispatch(removeLikeFailed(err));
      });
  };
};

export const addBookDisLike = (data) => {
  return (dispatch) => {
    axios
      .put(`book/dislike`, data)
      .then((response) => dispatch(addDisLikeSuccess(response.data)))

      .catch((err) => {
        dispatch(addDisLikeFailed(err));
      });
  };
};
export const removeBookDisLike = (data) => {
  return (dispatch) => {
    axios
      .put(`book/undislike`, data)
      .then((response) => dispatch(removeDisLikeSuccess(response.data)))

      .catch((err) => {
        dispatch(removeDisLikeFailed(err));
      });
  };
};
