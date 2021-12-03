import React, { useState, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getTicketRoomList, bookingTicket } from "../../redux/actions/booking";
import { getInfoUser } from "../../redux/actions/user";
import { formatMoneyVND } from "../../utils/formatMoneyVND";
import { NavigateNext } from "@material-ui/icons";
import LoadingPage from "../../components/LoadingPage";
import hanldeListSeat from "../../utils/handleListSeat";
import { ArrowBack } from "@material-ui/icons";
import Swal from "sweetalert2";
import "./booking.scss";

export default function BookingMovie() {
  const arrayAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const [listSeat, setListSeat] = useState([]);
  let [listUserChooseSeat, setListUserChooseSeat] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("zalopay");
  const [render, setRender] = useState();

  const { idBooking } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [taiKhoan, setTaiKhoan] = useState("");
  const { getTicketRoomListData, isLoading } = useSelector((state) => state.getTicketRoomList);
  const { getInfoUserData } = useSelector((state) => state.getInfoUser);

  // Check user isLogin => if not => go to the Login page
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      history.push("/login");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn không thể truy cập trang này vì lý do chưa đăng nhập, vui lòng đăng nhập để có thể truy cập!",
      });
    } else {
      setTaiKhoan(JSON.parse(localStorage.getItem("userInfo")).taiKhoan);
    }
  });

  // When getTicketRoomListData has data => hanldeListSeat => setListSeat
  useEffect(() => {
    getTicketRoomListData?.danhSachGhe && setListSeat(hanldeListSeat(getTicketRoomListData?.danhSachGhe, 10));
  }, [getTicketRoomListData]);

  // Get List Ticket Room from API
  useEffect(() => {
    if (taiKhoan !== "") {
      dispatch(getTicketRoomList(idBooking));
      dispatch(getInfoUser({ taiKhoan: taiKhoan }));
    }
  }, [idBooking, taiKhoan]);

  // When listUserChooseSeat change => handle the totalPrice ticket
  useEffect(() => {
    let resultPrice = listUserChooseSeat.reduce((result, item, index) => {
      return (result += item.giaVe);
    }, 0);
    setTotalPrice(resultPrice);
    return () => {
      setTotalPrice(0);
    };
  }, [listUserChooseSeat]);

  // Handle Choose Seat => change color button and setListUserChooseSeat
  const handleChooseSeat = (e, seat) => {
    if (e.currentTarget.className.includes("btn-choosing")) {
      e.currentTarget.className = seat.daDat
        ? "bookingMovie-left-row-seat btn-booked"
        : seat.loaiGhe === "Thuong"
        ? "bookingMovie-left-row-seat btn-normal"
        : "bookingMovie-left-row-seat btn-vip";
      setListUserChooseSeat(listUserChooseSeat.filter((item) => item !== seat));
    } else {
      e.currentTarget.className = "bookingMovie-left-row-seat btn-choosing";
      setListUserChooseSeat([...listUserChooseSeat, seat]);
    }
  };

  // Handle Payment-Method
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle Booking Ticket
  const handleBookingTicket = () => {
    const danhSachVe = [];
    listUserChooseSeat.map((item) => {
      danhSachVe.push({ maGhe: item.maGhe, giaVe: item.giaVe });
    });
    const objectToBookingTicket = {
      maLichChieu: idBooking,
      danhSachVe: danhSachVe,
      taiKhoanNguoiDung: taiKhoan,
    };
    if (danhSachVe.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn chưa đặt vé nào cả!",
      });
    } else {
      Swal.fire({
        title: "Xác nhận",
        text: "Xác nhận đặt vé, bạn có muốn đặt thêm vé nào không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tiếp tục",
        cancelButtonText: "Trở lại",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(bookingTicket(objectToBookingTicket, taiKhoan));
        }
      });
    }
  };

  // Handle Back Page
  const handleBackPage = () => {
    history.goBack();
  };

  // Handle Image Theater
  const handleImageTheater = () => {
    const theaterClusterName = getTicketRoomListData.thongTinPhim.tenCumRap;
    if (theaterClusterName.includes("BHD")) {
      return "/img/Theater/BHDStar.png";
    } else if (theaterClusterName.includes("CGV")) {
      return "/img/Theater/CGV.png";
    } else if (theaterClusterName.includes("CNS")) {
      return "/img/Theater/CineStar.png";
    } else if (theaterClusterName.includes("GLX")) {
      return "/img/Theater/Galaxy.png";
    } else if (theaterClusterName.includes("Lotte")) {
      return "/img/Theater/LotteCinima.png";
    } else if (theaterClusterName.includes("MegaGS")) {
      return "/img/Theater/MegaGS.png";
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div id="bookingMovie">
          <div className="bookingMovie-container">
            {/* Booking Movie Left */}
            <Grid item xs={8} className="bookingMovie-left">
              <div className="bookingMovie-left-header">
                <div className="header-back">
                  <button className="btn-back" onClick={handleBackPage}>
                    <ArrowBack className="icon-back" />
                  </button>
                </div>
                <div className="header-movieCluster">
                  <img src={handleImageTheater()} alt="" />
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
                  <div className="bookingMovie-left-row" key={index}>
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

            {/* Booking Movie Right */}
            <Grid item xs={4} className="bookingMovie-right">
              {/* Booking Movie Right Top */}
              <div className="bookingMovie-right-top">
                <div className="bookingMovie-right-movie">
                  {/* Booking Movie Right Top Info */}
                  <Grid item xs={8} className="bookingMovie-right-movie-info">
                    <p className="bookingMovie-right-movie-name">{getTicketRoomListData?.thongTinPhim?.tenPhim}</p>
                    <div className="bookingMovie-right-movie-detail">
                      <p className="bookingMovie-right-movie-age">P</p>
                      <p className="bookingMovie-right-movie-desc">120 phút - 2D - Phụ đề</p>
                    </div>
                    <span className="bookingMovie-right-movie-seat">Ghế đang chọn: </span>
                    <div style={{ display: "inline-flex", flexWrap: "wrap" }}>
                      {listUserChooseSeat.map((chooseSeat, index) => (
                        <button
                          className={
                            chooseSeat.daDat
                              ? "bookingMovie-left-row-seat btn-booked"
                              : chooseSeat.loaiGhe === "Thuong"
                              ? "bookingMovie-left-row-seat btn-normal"
                              : "bookingMovie-left-row-seat btn-vip"
                          }
                          style={{ margin: "0 20px 20px 0" }}
                          key={index}
                        >
                          <span>{chooseSeat.tenGhe}</span>
                        </button>
                      ))}
                    </div>
                    <p className="bookingMovie-right-movie-price">Tổng tiền: {formatMoneyVND(totalPrice)}</p>
                  </Grid>

                  {/* Booking Movie Right Top Img */}
                  <Grid item xs={4} className="bookingMovie-right-movie-img">
                    <img src={getTicketRoomListData?.thongTinPhim?.hinhAnh} alt="" />
                  </Grid>
                </div>

                <div className="bookingMovie-right-info">
                  <p>Tài khoản</p>
                  <input type="text" defaultValue={getInfoUserData?.taiKhoan} readOnly />
                </div>

                <div className="bookingMovie-right-info">
                  <p>Người nhận mã vé</p>
                  <input type="text" defaultValue={getInfoUserData?.hoTen} readOnly />
                </div>

                <div className="bookingMovie-right-info">
                  <p>Email nhận mã vé</p>
                  <input type="text" defaultValue={getInfoUserData?.email} readOnly />
                </div>

                <div className="bookingMovie-right-info">
                  <p>Số điện thoại nhận mã vé</p>
                  <input type="tel" defaultValue={getInfoUserData?.soDT} readOnly />
                </div>
              </div>

              {/* Booking Movie Right Middle */}
              <div className="bookingMovie-right-middle">
                <p className="bookingMovie-right-middle-title">Phương thức thanh toán</p>
                {/* Zalo Pay */}
                <div className="bookingMovie-right-middle-payment-method">
                  <div className="bookingMovie-right-middle-payment-method-info">
                    <img src="/img/Footer/zalopay.png" alt="" className="logo-payment" />
                    <span className="payment-name">Thanh toán qua Zalopay</span>
                  </div>
                  <div className="bookingMovie-right-middle-payment-method-checkbox">
                    <input
                      type="radio"
                      name="checkboxPayment"
                      className="checkbox-payment"
                      value="zalopay"
                      onChange={handlePayment}
                      defaultChecked={true}
                    />
                  </div>
                </div>
                {/* Vetcombank */}
                <div className="bookingMovie-right-middle-payment-method">
                  <div className="bookingMovie-right-middle-payment-method-info">
                    <img src="/img/Footer/VCB.png" alt="" className="logo-payment" />
                    <span className="payment-name">Thanh toán qua Vietcombank</span>
                  </div>
                  <div className="bookingMovie-right-middle-payment-method-checkbox">
                    <input type="radio" name="checkboxPayment" className="checkbox-payment" value="vietcombank" onChange={handlePayment} />
                  </div>
                </div>
                {/* Viettinbank */}
                <div className="bookingMovie-right-middle-payment-method">
                  <div className="bookingMovie-right-middle-payment-method-info">
                    <img src="/img/Footer/VIETTINBANK.png" alt="" className="logo-payment" />
                    <span className="payment-name">Thanh toán qua Viettinbank</span>
                  </div>
                  <div className="bookingMovie-right-middle-payment-method-checkbox">
                    <input type="radio" name="checkboxPayment" className="checkbox-payment" value="viettinbank" onChange={handlePayment} />
                  </div>
                </div>
                {/* Payoo */}
                <div className="bookingMovie-right-middle-payment-method">
                  <div className="bookingMovie-right-middle-payment-method-info">
                    <img src="/img/Footer/payoo.jpg" alt="" className="logo-payment" />
                    <span className="payment-name">Thanh toán qua Payoo</span>
                  </div>
                  <div className="bookingMovie-right-middle-payment-method-checkbox">
                    <input type="radio" name="checkboxPayment" className="checkbox-payment" value="payoo" onChange={handlePayment} />
                  </div>
                </div>
              </div>

              {/* Booking Movie Right Bottom */}
              <div className="bookingMovie-right-bottom">
                <div className="bookingMovie-right-bottom-left">
                  <span className="bookingMovie-right-bottom-total-price">{formatMoneyVND(totalPrice)}</span>
                </div>
                <div className="bookingMovie-right-bottom-right">
                  <button className="btn-booking-ticket" onClick={handleBookingTicket}>
                    <span className="btn-booking-ticket-text">Đặt vé</span>
                    <NavigateNext className="btn-booking-ticket-icon" />
                  </button>
                </div>
              </div>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}
