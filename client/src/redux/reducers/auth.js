import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/auth";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const loginState = {
  loginData,
  isLoading: false,
  error: null,
};

const registerState = {
  registerData: null,
  isLoading: false,
  error: null,
};

export function loginReducer(state = loginState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLoading: false, loginData: action.payload.data };
    }
    case LOGIN_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export function registerReducer(state = registerState, action) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case REGISTER_SUCCESS: {
      return { ...state, isLoading: false, registerData: action.payload.data };
    }
    case REGISTER_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}
