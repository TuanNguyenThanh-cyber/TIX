import {
  GET_INFO_USER_REQUEST,
  GET_INFO_USER_FAILURE,
  GET_INFO_USER_SUCCESS,
} from "../constants/user";

const initialGetInfoUser = {
  getInfoUserData: null,
  isLoading: false,
  error: null,
};

export function getInfoUserReducer(state = initialGetInfoUser, action) {
  switch (action.type) {
    case GET_INFO_USER_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_INFO_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getInfoUserData: action.payload.data,
      };
    }
    case GET_INFO_USER_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}
