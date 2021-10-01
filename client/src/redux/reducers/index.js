import { combineReducers } from "redux";
import { loginReducer, registerReducer } from "./auth";

const rootReducer = combineReducers({
  // Nơi khai báo các reducer con
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;
