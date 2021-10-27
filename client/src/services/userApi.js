import baseApi from "./baseApi";

const userApi = {
  getInfoUser: (value) => {
    return baseApi.post("/QuanLyNguoiDung/ThongTinTaiKhoan", value);
  },
  updateInfoUser: (value) => {
    return baseApi.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", value);
  },
};

export default userApi;
