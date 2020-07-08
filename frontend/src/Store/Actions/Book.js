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
export const fetchTopLikedBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_TOP_FIVE_LIKED_POST_SUCCESS,
    books,
  };
};

export const fetchTopLikedBooksFailed = (error) => {
  return {
    type: actionTypes.FETCH_TOP_FIVE_LIKED_POST_FAILED,
    error: error,
  };
};

export const deleteBookFailed = (error) => {
  return {
    type: actionTypes.DELETE_BOOK_FAILED,
    error: error,
  };
};
export const deleteBookSuccess = (data) => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    data,
  };
};
export const changeBookstatusFailed = (error) => {
  return {
    type: actionTypes.UPDATE_BOOK_STATUS_FAILED,
    error: error,
  };
};
export const changeBookStatusSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_BOOK_STATUS_SUCCESS,
    data,
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

export const fetchTopLikedBooks = () => {
  return (dispatch) => {
    axios
      .get("book/toplikedbooks")
      .then((response) => dispatch(fetchTopLikedBooksSuccess(response.data)))

      .catch((err) => {
        dispatch(fetchTopLikedBooksFailed(err));
      });
  };
};

export const deleteBook = (bookId) => {
  return (dispatch) => {
    axios
      .delete(`book/delete/${bookId}`)
      .then((response) => dispatch(deleteBookSuccess(response.data)))

      .catch((err) => {
        dispatch(deleteBookFailed(err));
      });
  };
};
export const changeBookStatus = (bookId, status) => {
  return (dispatch) => {
    axios
      .put(`book/changestatus/${bookId}`, status)
      .then((response) => dispatch(changeBookStatusSuccess(response.data)))

      .catch((err) => {
        dispatch(changeBookstatusFailed(err));
      });
  };
};

export const fetchAllBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_ALL_BOOKS_SUCCESS,
    books,
  };
};

export const fetchAllBooksFailed = (error) => {
  return {
    type: actionTypes.FETCH_ALL_BOOKS_FAILED,
    error: error,
  };
};

export const getAllbooks = () => {
  return (dispatch) => {
    axios
      .get(`books`)
      .then((response) => dispatch(fetchAllBooksSuccess(response.data)))

      .catch((err) => {
        dispatch(fetchAllBooksFailed(err));
      });
  };
};

export const addFavoriteSuccess = (data) => {
  return {
    type: actionTypes.ADD_FAVOURITE_SUCCESS,
    data,
  };
};

export const addFavoriteFailed = (error) => {
  return {
    type: actionTypes.ADD_FAVOURITE_FAILED,
    error: error,
  };
};
export const removeFavoriteSuccess = (data) => {
  return {
    type: actionTypes.REMOVE_FAVOURITE_SUCCESS,
    data,
  };
};

export const removeFavoriteFailed = (error) => {
  return {
    type: actionTypes.REMOVE_FAVOURITE_FAILED,
    error: error,
  };
};

export const addBookFavourite = (bookId) => {
  return (dispatch) => {
    axios
      .put(`user/addfavorite/${bookId}`)
      .then((response) => dispatch(addFavoriteSuccess(response.data)))

      .catch((err) => {
        dispatch(addFavoriteFailed(err));
      });
  };
};
export const removeBookFavourite = (bookId) => {
  return (dispatch) => {
    axios
      .put(`user/removefavorite/${bookId}`)
      .then((response) => dispatch(removeFavoriteSuccess(response.data)))

      .catch((err) => {
        dispatch(removeFavoriteFailed(err));
      });
  };
};

export const getTopReadedBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_TOP_READED_BOOKS_SUCCESS,
    books,
  };
};

export const getTopReadedBooksFailed = (error) => {
  return {
    type: actionTypes.FETCH_TOP_READED_BOOKS_FAILED,
    error: error,
  };
};
export const topFiveReadedBooks = () => {
  return (dispatch) => {
    axios
      .get(`book/top/reads`)
      .then((response) => dispatch(getTopReadedBooksSuccess(response.data)))

      .catch((err) => {
        dispatch(getTopReadedBooksFailed(err));
      });
  };
};

export const updateBookSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_BOOK_SUCCESS,
    data,
  };
};

export const updateBookFailed = (error) => {
  return {
    type: actionTypes.UPDATE_BOOK_FAILED,
    error: error,
  };
};

export const updateBook = (bookId, data) => {
  return (dispatch) => {
    axios
      .put(`book/update/${bookId}`, data)
      .then((response) => dispatch(updateBookSuccess(response.data)))

      .catch((err) => {
        dispatch(updateBookFailed(err));
      });
  };
};
