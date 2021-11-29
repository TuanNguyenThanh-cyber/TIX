import {
  GET_TICKET_ROOM_LIST_REQUEST,
  GET_TICKET_ROOM_LIST_SUCCESS,
  GET_TICKET_ROOM_LIST_FAILURE,
  BOOKING_TICKET_REQUEST,
  BOOKING_TICKET_SUCCESS,
  BOOKING_TICKET_FAILURE,
} from "../constants/booking";

const initialGetTicketRoomList = {
  getTicketRoomListData: null,
  isLoading: false,
  error: null,
};

const initialBookingTicket = {
  bookingTicketData: null,
  isLoading: false,
  error: null,
};

export function getTicketRoomListReducer(state = initialGetTicketRoomList, action) {
  switch (action.type) {
    case GET_TICKET_ROOM_LIST_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_TICKET_ROOM_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getTicketRoomListData: action.payload.data,
      };
    }
    case GET_TICKET_ROOM_LIST_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}

export function bookingTicketReducer(state = initialBookingTicket, action) {
  switch (action.type) {
    case BOOKING_TICKET_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case BOOKING_TICKET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        bookingTicketData: action.payload.data,
      };
    }
    case BOOKING_TICKET_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    default:
      return state;
  }
}
