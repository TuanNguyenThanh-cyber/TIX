import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getTicketRoomList } from "../../redux/actions/booking";
import LoadingPage from "../../components/LoadingPage";
import hanldeListSeat from "../../utils/handleListSeat";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import "./booking.scss";

export default function BookingMovie() {
  const arrayAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const [listSeat, setListSeat] = useState([]);
  let listUserChooseSeat = [];

  const { idBooking } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTicketRoomListData, isLoading } = useSelector((state) => state.getTicketRoomList);

  useEffect(() => {
    // When getTicketRoomListData has data => hanldeListSeat => setListSeat
    getTicketRoomListData?.danhSachGhe && setListSeat(hanldeListSeat(getTicketRoomListData?.danhSachGhe, 10));
  }, [getTicketRoomListData]);

  // Get List Ticket Room
  useEffect(() => {
    dispatch(getTicketRoomList(idBooking));
  }, []);

  // Handle Choose Seat
  const handleChooseSeat = (e, seat) => {
    if (e.currentTarget.className.includes("btn-choosing")) {
      e.currentTarget.className = seat.daDat
        ? "bookingMovie-left-row-seat btn-booked"
        : seat.loaiGhe === "Thuong"
        ? "bookingMovie-left-row-seat btn-normal"
        : "bookingMovie-left-row-seat btn-vip";
      listUserChooseSeat.pop(seat);
    } else {
      e.currentTarget.className = "bookingMovie-left-row-seat btn-choosing";
      listUserChooseSeat.push(seat);
    }
    console.log(listUserChooseSeat);
  };

  // Count down here !
  // When count down finish => return popup notice user
  const Completionist = () =>
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hết giờ! Vui lòng quay trở lại!",
    }).then((result) => {
      history.go(0);
    });
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="header-timing-countdown">
          <span className="header-timing-star">{minutes < 10 ? "0" + minutes : minutes}</span>:
          <span className="header-timing-end">{seconds < 10 ? "0" + seconds : seconds}</span>
        </div>
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div id="bookingMovie">
          <div className="bookingMovie-container">
            <Grid item xs={8} className="bookingMovie-left">
              <div className="bookingMovie-left-header">
                <div className="header-movieCluster">
                  <img src="/img/Theater/BHDStar.png" alt="" />
                  <div className="header-movieCluster-content">
                    <div className="header-movieCluster-place">
                      <span className="header-movieCluster-name">{getTicketRoomListData?.thongTinPhim.tenCumRap}</span>
                    </div>
                    <span className="header-movieCluster-hour">
                      {getTicketRoomListData?.thongTinPhim.ngayChieu} - {getTicketRoomListData?.thongTinPhim.gioChieu} -{" "}
                      {getTicketRoomListData?.thongTinPhim.tenRap}
                    </span>
                  </div>
                </div>
                <div className="header-timing">
                  <span className="header-timing-title">Thời gian giữ ghế</span>
                  {/* Countdown here! (300000s = 5mins) */}
                  <Countdown date={Date.now() + 300000} renderer={renderer} />
                </div>
              </div>
              <div className="bookingMovie-left-content">
                <div className="bookingMovie-left-title">
                  <span>Màn hình</span>
                </div>

                <div className="bookingMovie-left-screen">
                  <img src="/img/screen.png" alt="" />
                </div>
                {/* Note */}
                <div className="bookingMovie-left-button-note">
                  <div className="button-note">
                    <button className="btn-booked">
                      <Close className="btn-booked-icon" />
                    </button>
                    <p className="button-note-text">Đã đặt</p>
                  </div>
                  <div className="button-note">
                    <button className="btn-choosing"></button>
                    <p className="button-note-text">Đang chọn</p>
                  </div>
                  <div className="button-note">
                    <button className="btn-vip"></button>
                    <p className="button-note-text">Ghế VIP</p>
                  </div>
                  <div className="button-note">
                    <button className="btn-normal"></button>
                    <p className="button-note-text">Ghế Thường</p>
                  </div>
                </div>
                {listSeat.map((seats, index) => (
                  <div className="bookingMovie-left-row">
                    <span className="bookingMovie-left-row-name">{arrayAlphabet[index]}</span>
                    <div className="bookingMovie-left-row-seats" key={index}>
                      {seats.map((seat, index) => (
                        <button
                          className={
                            seat.daDat
                              ? "bookingMovie-left-row-seat btn-booked"
                              : seat.loaiGhe === "Thuong"
                              ? "bookingMovie-left-row-seat btn-normal"
                              : "bookingMovie-left-row-seat btn-vip"
                          }
                          key={index}
                          onClick={(e) => handleChooseSeat(e, seat)}
                        >
                          <span>{seat.daDat ? "x" : seat.tenGhe}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={4} className="bookingMovie-right">
              <div className="bookingMovie-right-top">
                <div className="bookingMovie-right-movie">
                  <div className="bookingMovie-right-movie-info">
                    <p className="bookingMovie-right-movie-name">Chị chị em em</p>
                    <p className="bookingMovie-right-movie-age">P</p>
                    <p className="bookingMovie-right-movie-detail">120 phút - 2D - Phụ đề</p>
                  </div>
                  <div className="bookingMovie-right-movie-img">
                    <img src="/img/trang-ti-16194120693380_215x318.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="bookingMovie-right-bottom"></div>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}
