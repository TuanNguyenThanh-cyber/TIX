import { combineReducers } from "redux";
import { loginReducer, registerReducer } from "./auth";
import { getMovieListReducer, getMovieDetailReducer } from "./movie";
import { getInfoUserReducer } from "./user";
import { getTicketRoomListReducer, bookingTicketReducer } from "./booking";
import { getTheaterSystemReducer, getTheaterClusterReducer, getInfoTheaterSystemShowtimesReducer } from "./theater";
import { changeGpReducer } from "./gp";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
  changeGp: changeGpReducer,
  getMovieList: getMovieListReducer,
  getMovieDetail: getMovieDetailReducer,
  getTheaterSystem: getTheaterSystemReducer,
  getTheaterCluster: getTheaterClusterReducer,
  getInfoTheaterSystemShowtimes: getInfoTheaterSystemShowtimesReducer,
  getInfoUser: getInfoUserReducer,
  getTicketRoomList: getTicketRoomListReducer,
  bookingTicket: bookingTicketReducer,
});

export default rootReducer;
