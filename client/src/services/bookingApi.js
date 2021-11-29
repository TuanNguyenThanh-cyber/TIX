import baseApi from "./baseApi";

const bookingApi = {
  getTicketRoomList: (idShowtime) => {
    return baseApi.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idShowtime}`);
  },
  bookingTicket: (value) => {
    return baseApi.post("/QuanLyDatVe/DatVe", value);
  },
};

export default bookingApi;
