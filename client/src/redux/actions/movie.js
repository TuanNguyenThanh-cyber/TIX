import {
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_LIST_FAILURE,
} from "../constants/movie";
import movieApi from "../../services/movieApi";

export function getMovieList(gp) {
  return async (dispatch) => {
    dispatch({ type: GET_MOVIE_LIST_REQUEST });

    try {
      const { data } = await movieApi.getMovieList(gp);
      dispatch({ type: GET_MOVIE_LIST_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_MOVIE_LIST_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
