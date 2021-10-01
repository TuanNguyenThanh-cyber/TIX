import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/auth";
import Swal from "sweetalert2";
import authApi from "../../services/authApi";

export function login(value) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const { data } = await authApi.login(value);
      // Lưu thông tin user xuống localStorage để giữ trạng thái đăng nhập khi user tắt trang web
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: LOGIN_SUCCESS, payload: { data } });
      Swal.fire(
        "Đăng nhập thành công!",
        "Chúc bạn có trải nghiệm vui vẻ tại TIX!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.href="/";
        }
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function register(value) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const { data } = await authApi.register(value);
      dispatch({ type: REGISTER_SUCCESS, payload: { data } });
      Swal.fire(
        "Đăng ký thành công!",
        "Quay trở lại trang đăng nhập!",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
