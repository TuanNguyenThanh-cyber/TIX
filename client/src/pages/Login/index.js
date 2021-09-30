import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleLogin = (value) => {
    console.log(value);
  };
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
            Đăng nhập
          </button>
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

        <Link to="/" className="link-to-back-home">
          Quay trở về trang chủ.
        </Link>
      </div>
    </div>
  );
}
