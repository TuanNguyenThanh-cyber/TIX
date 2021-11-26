import baseApi from "./baseApi";

const bookingApi = {
  getTicketRoomList: (idShowtime) => {
    return baseApi.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtime}`);
  },
};

export default bookingApi;
