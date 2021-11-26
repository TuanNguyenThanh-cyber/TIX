import { GET_TICKET_ROOM_LIST_REQUEST, GET_TICKET_ROOM_LIST_SUCCESS, GET_TICKET_ROOM_LIST_FAILURE } from "../constants/booking";
import bookingApi from "../../services/bookingApi";

export function getTicketRoomList(idShowtime) {
  return async (dispatch) => {
    dispatch({ type: GET_TICKET_ROOM_LIST_REQUEST });

    try {
      const { data } = await bookingApi.getTicketRoomList(idShowtime);
      dispatch({ type: GET_TICKET_ROOM_LIST_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_TICKET_ROOM_LIST_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
