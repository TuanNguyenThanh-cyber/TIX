import {
  GET_INFO_USER_REQUEST,
  GET_INFO_USER_SUCCESS,
  GET_INFO_USER_FAILURE,
} from "../constants/user";
import userApi from "../../services/userApi";

export function infoUser(value) {
  return async (dispatch) => {
    dispatch({ type: GET_INFO_USER_REQUEST });

    try {
      const { data } = await userApi.getInfoUser(value);
      dispatch({ type: GET_INFO_USER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_INFO_USER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
