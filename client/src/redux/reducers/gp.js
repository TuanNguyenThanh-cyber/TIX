import { CHANGE_GP } from "../constants/gp";

const initialGp = {
  gp: "GP02",
};

export function changeGpReducer(state = initialGp, action) {
  switch (action.type) {
    case CHANGE_GP:
      return { ...state, gp: action.payload.gp };
    default:
      return state;
  }
}
