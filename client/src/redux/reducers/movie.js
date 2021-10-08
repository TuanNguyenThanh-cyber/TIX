import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAILURE,
} from "../constants/movie";

const initialGetMovieList = {
  getMovieListData: null,
  isLoading: false,
  error: null,
};

export function getMovieListReducer(state = initialGetMovieList, action) {
  switch (action.type) {
    case GET_MOVIE_LIST_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_MOVIE_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getMovieListData: action.payload.data,
      };
    }
    case GET_MOVIE_LIST_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}
