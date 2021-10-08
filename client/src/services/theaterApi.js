import baseApi from "./baseApi";

const theaterApi = {
  getTheaterSystem: () => {
    return baseApi.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  getTheaterCluster: (idTheaterSystem) => {
    return baseApi.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idTheaterSystem}`);
  },
  getInfoTheaterSystemShowtimes: (idTheaterSystem, gp) => {
    return baseApi.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${idTheaterSystem}&maNhom=${gp}`);
  }
};

export default theaterApi;
