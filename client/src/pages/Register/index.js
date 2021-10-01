import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { register as registerAction } from "../../redux/actions/auth";
import { Close } from "@material-ui/icons";
import ReactLoading from "react-loading";
import "./register.scss";

// Regex VietNam phone number
const phoneRegVn = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Tạo schema validation
const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  hoTen: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Không đúng định dạng email"),
  soDt: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(phoneRegVn, "Không đúng định dạng số điện thoại"),
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải từ 8 kí tự trở lên"),
  nhapLaiMatKhau: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("matKhau"), null], "Không trùng khớp với mật khẩu"),
});

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const handleRegister = (value) => {
    let { taiKhoan, matKhau, email, soDt, hoTen } = value;
    const req = {
      taiKhoan,
      matKhau,
      email,
      soDt,
      hoTen,
      maNhom: "GP15",
      maLoaiNguoiDung: "KhachHang",
    };
    dispatch(registerAction(req));
  };

  const handleClose = () => {
    history.push("/");
  };

  return (
    <div id="register">
      <div className="register-container">
        <p className="register-title">Đăng ký</p>

        <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="text"
                className="register-form-input"
                placeholder="Tài khoản"
                {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <div className="register-form-error">
                {errors.taiKhoan.message}
              </div>
            )}
          </div>

          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="text"
                className="register-form-input"
                placeholder="Họ và tên"
                {...register("hoTen")}
              />
            </div>
            {errors.hoTen && (
              <div className="register-form-error">{errors.hoTen.message}</div>
            )}
          </div>

          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="text"
                className="register-form-input"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <div className="register-form-error">{errors.email.message}</div>
            )}
          </div>

          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="text"
                className="register-form-input"
                placeholder="Số điện thoại"
                {...register("soDt")}
              />
            </div>
            {errors.soDt && (
              <div className="register-form-error">{errors.soDt.message}</div>
            )}
          </div>

          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="password"
                className="register-form-input"
                placeholder="Mật khẩu"
                {...register("matKhau")}
              />
            </div>
            {errors.matKhau && (
              <div className="register-form-error">
                {errors.matKhau.message}
              </div>
            )}
          </div>

          <div className="register-form-item">
            <div className="register-form-input-label">
              <input
                type="password"
                className="register-form-input"
                placeholder="Nhập lại mật khẩu"
                {...register("nhapLaiMatKhau")}
              />
            </div>
            {errors.nhapLaiMatKhau && (
              <div className="register-form-error">
                {errors.nhapLaiMatKhau.message}
              </div>
            )}
          </div>

          {error && <div className="register-form-error">{error}</div>}

          <button type="submit" className="btn-register">
          {isLoading ? (
              <ReactLoading
                type="spinningBubbles"
                color="#fff"
                height={15}
                width={15}
                className="react-loading"
              />
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <p className="register-text-no-account">
          Nếu bạn đã có tài khoản?
          <Link to="/login"> Vui lòng đăng nhập tại đây.</Link>
        </p>

        <button to="/" className="btn-close" onClick={handleClose}>
          <Close className="btn-close-icon"></Close>
        </button>
      </div>
    </div>
  );
}
