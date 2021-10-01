import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import { Close } from "@material-ui/icons";
import ReactLoading from "react-loading";
import "./login.scss";

// Tạo schema validation
const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải từ 8 kí tự trở lên"),
});

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("userInfo");
  const { isLoading, error } = useSelector((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleLogin = (value) => {
    dispatch(login(value));
  };

  const handleClose = () => {
    history.push("/");
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  //   return () => {};
  // }, [userInfo]);

  return (
    <div id="login">
      <div className="login-container">
        <p className="login-title">Đăng nhập</p>
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <div className="login-form-item">
            <div className="login-form-input-label">
              <input
                type="text"
                className="login-form-input"
                placeholder="Tài khoản"
                {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <div className="login-form-error">{errors.taiKhoan.message}</div>
            )}
          </div>

          <div className="login-form-item">
            <div className="login-form-input-label">
              <input
                type="password"
                className="login-form-input"
                placeholder="Mật khẩu"
                {...register("matKhau")}
              />
            </div>
            {errors.matKhau && (
              <div className="login-form-error">{errors.matKhau.message}</div>
            )}
          </div>

          <button type="submit" className="btn-login">
            {isLoading ? (
              <ReactLoading
                type="spinningBubbles"
                color="#fff"
                height={15}
                width={15}
                className="react-loading"
              />
            ) : (
              "Đăng nhập"
            )}
          </button>

          {error && <div className="login-form-error">{error}</div>}
        </form>

        <div className="login-form-help">
          <div className="login-remember">
            <input type="checkbox" />
            <span>Remember me?</span>
          </div>
          <a href="">Need help?</a>
        </div>

        <p className="login-text-info">
          Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </p>

        <p className="login-text-no-account">
          Nếu bạn chưa có tài khoản?
          <Link to="/register"> Vui lòng đăng ký tại đây.</Link>
        </p>

        <button to="/" className="btn-close" onClick={handleClose}>
          <Close className="btn-close-icon"></Close>
        </button>
      </div>
    </div>
  );
}
