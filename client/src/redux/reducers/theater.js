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

const initialGetTheaterSystem = {
  theaterSystemData: null,
  isLoading: false,
  error: null,
};

const initialGetTheaterCluster = {
  theaterClusterData: null,
  isLoading: false,
  error: null,
};

const initialGetInfoTheaterSystemShowtimes = {
  theaterSystemShowtimesData: null,
  isLoading: false,
  error: null,
};

export function getTheaterSystemReducer(
  state = initialGetTheaterSystem,
  action
) {
  switch (action.type) {
    case GET_THEATER_SYSTEM_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_THEATER_SYSTEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        theaterSystemData: action.payload.data,
      };
    }
    case GET_THEATER_SYSTEM_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export function getTheaterClusterReducer(
  state = initialGetTheaterCluster,
  action
) {
  switch (action.type) {
    case GET_THEATER_CLUSTER_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_THEATER_CLUSTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        theaterClusterData: action.payload.data,
      };
    }
    case GET_THEATER_CLUSTER_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export function getInfoTheaterSystemShowtimesReducer(
  state = initialGetInfoTheaterSystemShowtimes,
  action
) {
  switch (action.type) {
    case GET_INFO_THEATER_SYSTEM_SHOWTIMES_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_INFO_THEATER_SYSTEM_SHOWTIMES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        theaterSystemShowtimesData: action.payload.data,
      };
    }
    case GET_INFO_THEATER_SYSTEM_SHOWTIMES_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}
