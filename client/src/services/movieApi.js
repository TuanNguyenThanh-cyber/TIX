import baseApi from "./baseApi";

const movieApi = {
  getMovieList: (gp) => {
    return baseApi.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${gp}`);
  },
};

export default movieApi;
