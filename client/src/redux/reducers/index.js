import { combineReducers } from "redux";
import { loginReducer, registerReducer } from "./auth";
import { getMovieListReducer } from "./movie";
import { getInfoUserReducer } from "./user";
import {
  getTheaterSystemReducer,
  getTheaterClusterReducer,
  getInfoTheaterSystemShowtimesReducer,
} from "./theater";
import { changeGpReducer } from "./gp";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
  changeGp: changeGpReducer,
  getMovieList: getMovieListReducer,
  getTheaterSystem: getTheaterSystemReducer,
  getTheaterCluster: getTheaterClusterReducer,
  getInfoTheaterSystemShowtimes: getInfoTheaterSystemShowtimesReducer,
  getInfoUser: getInfoUserReducer,
});

export default rootReducer;
