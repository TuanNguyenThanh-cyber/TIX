import baseApi from "./baseApi";

const userApi = {
  getInfoUser: (value) => {
    return baseApi.post("/QuanLyNguoiDung/ThongTinTaiKhoan", value);
  },
};

export default userApi;
