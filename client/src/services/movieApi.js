import baseApi from "./baseApi";

const movieApi = {
  getMovieList: (gp) => {
    return baseApi.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${gp}`);
  },
  getMovieDetail: (movieId) => {
    return baseApi.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
};

export default movieApi;
