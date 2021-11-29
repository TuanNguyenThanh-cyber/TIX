import {
  GET_TICKET_ROOM_LIST_REQUEST,
  GET_TICKET_ROOM_LIST_SUCCESS,
  GET_TICKET_ROOM_LIST_FAILURE,
  BOOKING_TICKET_REQUEST,
  BOOKING_TICKET_SUCCESS,
  BOOKING_TICKET_FAILURE,
} from "../constants/booking";
import Swal from "sweetalert2";
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

export function bookingTicket(value, taiKhoan) {
  return async (dispatch) => {
    dispatch({ type: BOOKING_TICKET_REQUEST });

    try {
      const { data } = await bookingApi.bookingTicket(value);
      dispatch({ type: BOOKING_TICKET_SUCCESS, payload: { data } });
      Swal.fire({
        icon: "success",
        title: "Đặt vé thành công",
        text: "Cám ơn bạn đã tin tưởng và ủng hộ TIX. Chúc bạn có những trải nghiệm vui vẻ tại TIX",
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Đặt vé mới",
        denyButtonText: "Trở về trang chủ",
        cancelButtonText: "Xem thông tin đặt vé",
        confirmButtonColor: "#00ac4d",
        denyButtonColor: "#fb4226",
        cancelButtonColor: "#008fe5",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) {
          window.location.href = "/";
        } else if (result.isDismissed) {
          window.location.href = `/profile/${taiKhoan}`;
        }
      });
    } catch (error) {
      dispatch({
        type: BOOKING_TICKET_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
