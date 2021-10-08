import {
  GET_THEATER_SYSTEM_REQUEST,
  GET_THEATER_SYSTEM_SUCCESS,
  GET_THEATER_SYSTEM_FAILURE,
  GET_THEATER_CLUSTER_REQUEST,
  GET_THEATER_CLUSTER_SUCCESS,
  GET_THEATER_CLUSTER_FAILURE,
  GET_INFO_THEATER_SYSTEM_SHOWTIMES_REQUEST,
  GET_INFO_THEATER_SYSTEM_SHOWTIMES_SUCCESS,
  GET_INFO_THEATER_SYSTEM_SHOWTIMES_FAILURE,
} from "../constants/theater";

import theaterApi from "../../services/theaterApi";

export function getTheaterSystem() {
  return async (dispatch) => {
    dispatch({ type: GET_THEATER_SYSTEM_REQUEST });

    try {
      const { data } = await theaterApi.getTheaterSystem();
      dispatch({ type: GET_THEATER_SYSTEM_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_THEATER_SYSTEM_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function getTheaterCluster(idTheaterSystem) {
  return async (dispatch) => {
    dispatch({ type: GET_THEATER_CLUSTER_REQUEST });

    try {
      const { data } = await theaterApi.getTheaterCluster(idTheaterSystem);
      dispatch({ type: GET_THEATER_CLUSTER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_THEATER_CLUSTER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function getInfoTheaterSystemShowtimes(idTheaterSystem, gp) {
  return async (dispatch) => {
    dispatch({ type: GET_INFO_THEATER_SYSTEM_SHOWTIMES_REQUEST });

    try {
      const { data } = await theaterApi.getInfoTheaterSystemShowtimes(idTheaterSystem, gp);
      dispatch({ type: GET_INFO_THEATER_SYSTEM_SHOWTIMES_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_INFO_THEATER_SYSTEM_SHOWTIMES_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
