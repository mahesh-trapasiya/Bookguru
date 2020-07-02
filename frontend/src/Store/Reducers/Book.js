import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const intialState = {
  error: null,
  loading: false,
  categories: "",
  userBooks: null,
  book: null,
  likedBooks: null,
  message: "",
  books: null,
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return updateObject(state, { categories: action.categories.categories });
    case actionTypes.FETCH_CATEGORIES_FAIL:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.ADD_BOOK_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.ADD_BOOK_SUCCESS:
      return updateObject(state, action);
    case actionTypes.ADD_BOOK_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.FETCH_BOOK_USER_BY_ID_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_BOOK_USER_BY_ID_SUCCESS:
      return updateObject(state, { userBooks: action.books, loading: false });
    case actionTypes.FETCH_BOOK_USER_BY_ID_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.FETCH_BOOK_BY_ID_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.FETCH_BOOK_BY_ID_SUCCESS:
      return updateObject(state, { book: action.book.books[0] });
    case actionTypes.FETCH_BOOK_BY_ID_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.ADD_COMMENT_SUCCESS:
      return updateObject(state, action);
    case actionTypes.ADD_COMMENT_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.ADD_LIKE_SUCCESS:
      return updateObject(state, action);
    case actionTypes.ADD_LIKE_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.REMOVE_LIKE_SUCCESS:
      return updateObject(state, action);
    case actionTypes.REMOVE_LIKE_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.ADD_DISLIKE_SUCCESS:
      return updateObject(state, action);
    case actionTypes.ADD_DISLIKE_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.REMOVE_DISLIKE_SUCCESS:
      return updateObject(state, action);
    case actionTypes.REMOVE_DISLIKE_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.DELETE_BOOK_SUCCESS:
      return updateObject(state, {
        message: action.data.data ? action.data.data.message : "",
        error: action.data.error,
      });
    case actionTypes.DELETE_BOOK_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.UPDATE_BOOK_STATUS_SUCCESS:
      return updateObject(state, {
        message: action.data.data ? action.data.data.message : "",
        error: action.data.error,
      });
    case actionTypes.UPDATE_BOOK_STATUS_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.FETCH_TOP_FIVE_LIKED_POST_SUCCESS:
      return updateObject(state, { likedBooks: action.books.result });
    case actionTypes.FETCH_TOP_FIVE_LIKED_POST_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    case actionTypes.FETCH_ALL_BOOKS_SUCCESS:
      return updateObject(state, { books: action.books.books });
    case actionTypes.FETCH_ALL_BOOKS_FAILED:
      return updateObject(state, { error: action.error, loading: false });

    default:
      return state;
  }
};

export default reducer;
