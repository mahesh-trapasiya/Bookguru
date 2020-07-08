import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  user: null,
  readLaterBook: null,
  recentReadsBooks: null,
  recentFavoriteBooks: null,
  randomBooks: null,
  readAllowed: true,
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
    case actionTypes.FETCH_USER_READ_LATER_SUCCESS:
      return updateObject(state, { readLaterBook: action.readLater[0] });
    case actionTypes.FETCH_USER_READ_LATER_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.ADD_BOOK_READED_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.ADD_BOOK_READED_SUCCESS:
      return updateObject(state, {
        readAllowed: action.data.readAllowed,
        message: action.data.data,
        error: action.data.error,
      });
    case actionTypes.FETCH_RECENT_THREE_READ_SUCCESS:
      return updateObject(state, {
        recentReadsBooks: action.books.result,
        loading: false,
      });
    case actionTypes.FETCH_RECENT_THREE_READ_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.FETCH_RECENT_THREE_FAVORITE_SUCCESS:
      return updateObject(state, {
        recentFavoriteBooks: action.books.result,
        loading: false,
      });
    case actionTypes.FETCH_RECENT_THREE_FAVORITE_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.FETCH_RANDOM_THREE_READLATER_SUCCESS:
      return updateObject(state, {
        randomBooks: action.books,
        loading: false,
      });
    case actionTypes.FETCH_RANDOM_THREE_READLATER_FAILED:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
