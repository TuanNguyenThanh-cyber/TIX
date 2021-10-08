import { CHANGE_GP } from "../constants/gp";

export const changeGp = (gp) => {
  return {
    type: CHANGE_GP,
    payload: {
      gp,
    },
  };
};
