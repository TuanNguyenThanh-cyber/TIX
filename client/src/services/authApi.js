import baseApi from "./baseApi";

const authApi = {
  login: (value) => {
    return baseApi.post("/QuanLyNguoiDung/DangNhap", value);
  },
  register: (value) => {
    return baseApi.post("/QuanLyNguoiDung/DangKy", value);
  },
};

export default authApi;
