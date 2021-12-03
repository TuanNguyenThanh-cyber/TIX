import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "../../redux/actions/movie";
import { InputLabel, FormControl, Select } from "@material-ui/core";
import { getHoursAndMins, getDate } from "../../utils/separateDayAndTime";
import { useHistory } from "react-router-dom";
import "./hometools.scss";

export default function HomeTools() {
  const dispatch = useDispatch();
  const history = useHistory();

  // State for movie
  const [movie, setMovie] = useState("");
  const [idMovie, setIdMovie] = useState();
  const [listMovie, setListMovie] = useState([]);

  // State theater
  const [theater, setTheater] = useState("");
  const [listTheater, setListTheater] = useState([]);

  // State theaterCluster
  const [theaterCluster, setTheaterCluster] = useState("");
  const [listTheaterCluster, setListTheaterCluster] = useState([]);

  // State time
  const [time, setTime] = useState("");
  const [listTime, setListTime] = useState([]);

  // State idBooking
  const [idBooking, setIdBooking] = useState("");

  // State in reducer
  const { gp } = useSelector((state) => state.changeGp);
  const { getMovieListData } = useSelector((state) => state.getMovieList);
  const { getMovieDetailData, isLoading } = useSelector((state) => state.getMovieDetail);

  const handleChange = (e, type) => {
    switch (type) {
      case "movie":
        setMovie(e.target.value);
        break;
      case "theater":
        setTheater(e.target.value);
        break;
      case "theaterCluster":
        setTheaterCluster(e.target.value);
        break;
      case "time":
        setTime(e.target.value);
        break;
      default:
        break;
    }
  };

  // Set Movie List After Call Api Get MovieListData
  useEffect(() => {
    if (getMovieListData) {
      setListMovie(
        getMovieListData.map((item) => {
          return {
            tenPhim: item.tenPhim,
            maPhim: item.maPhim,
          };
        })
      );
    }
  }, [getMovieListData]);

  // When gp changed -> setMovie and setIdMovie
  useEffect(() => {
    setMovie(" ");
    setTheater(" ");
    setTheaterCluster(" ");
    setTime(" ");
    setIdBooking("");
    setListMovie([]);
    setListTheater([]);
    setListTheaterCluster([]);
    setListTime([]);
    setIdMovie();
  }, [gp]);

  // When movieName changed -> setIdMovie
  useEffect(() => {
    if (movie) {
      setIdMovie(listMovie.filter((item) => item.tenPhim === movie)[0]?.maPhim);
      setListTheater([]);
      setListTheaterCluster([]);
      setListTime([]);
    }
  }, [movie]);

  // When idMovie changed Call Api get info this movie
  useEffect(() => {
    if (idMovie) {
      dispatch(getMovieDetail(idMovie));
    }
  }, [idMovie]);

  // getMovieDetailData has data => handle here
  useEffect(() => {
    if (getMovieDetailData) {
      const arrayTheater = [...new Set(getMovieDetailData.lichChieu.map((showtime) => showtime.thongTinRap.tenHeThongRap))];
      setListTheater(arrayTheater);
    }
  }, [getMovieDetailData]);

  // When user choose theater -> get all theater cluster
  useEffect(() => {
    if (getMovieDetailData) {
      const arrayFliter = getMovieDetailData.lichChieu.filter((showtime) => showtime.thongTinRap.tenHeThongRap === theater);
      setListTheaterCluster([...new Set(arrayFliter.map((item) => item.thongTinRap.tenCumRap))]);
      setListTime([]);
      setTime(" ");
    }
  }, [theater]);

  // When user choose theaterCluster -> get all time (maybe change background button booking)
  useEffect(() => {
    if (getMovieDetailData) {
      const arrayFliter = getMovieDetailData.lichChieu.filter((showtime) => showtime.thongTinRap.tenCumRap === theaterCluster);
      setListTime(arrayFliter.map((item) => item.ngayChieuGioChieu));
    }
  }, [theaterCluster]);

  // Get idBooking here depends on (movie, theater, theaterCluster, time)
  useEffect(() => {
    if (movie && movie !== " " && theater && theater !== " " && theaterCluster && theaterCluster !== " " && time && time !== " ") {
      const arrayIdBooking = getMovieDetailData.lichChieu.filter(
        (showtime) =>
          showtime.tenPhim === movie &&
          showtime.thongTinRap.tenHeThongRap === theater &&
          showtime.thongTinRap.tenCumRap === theaterCluster &&
          showtime.ngayChieuGioChieu === time
      );
      if (arrayIdBooking.length !== 0) {
        setIdBooking(arrayIdBooking[0].maLichChieu);
      } else {
        setIdBooking("");
      }
    } else {
      setIdBooking("");
    }
  }, [movie, theater, theaterCluster, time]);

  // Handle Booking
  const handleBooking = () => {
    if (idBooking) {
      history.push(`/bookingMovie/${idBooking}`);
    }
  };

  return (
    <div id="homeTools">
      {/* Movie */}
      <FormControl variant="outlined" className="homeTools-movie">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-movie">
          Phim
        </InputLabel>
        <Select
          native
          value={movie}
          onChange={(e) => handleChange(e, "movie")}
          label="Movie"
          inputProps={{
            name: "movie",
            id: "homeTools-input-movie",
          }}
        >
          <option value=" ">{isLoading ? "-- Loading --" : "-- Vui lòng chọn phim --"}</option>
          {listMovie &&
            listMovie.map((item) => (
              <option value={item.tenPhim} key={item.maPhim}>
                {item.tenPhim}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* Theater */}
      <FormControl variant="outlined" className="homeTools-theater">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-theater">
          Rạp
        </InputLabel>
        <Select
          native
          value={theater}
          onChange={(e) => handleChange(e, "theater")}
          label="Theater"
          inputProps={{
            name: "theater",
            id: "homeTools-input-theater",
          }}
        >
          <option value=" ">{isLoading ? "-- Loading --" : "-- Vui lòng chọn rạp --"}</option>
          {listTheater &&
            listTheater.map((theater, index) => (
              <option value={theater} key={index}>
                {theater}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* TheaterCluster */}
      <FormControl variant="outlined" className="homeTools-theaterCluster">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-theaterCluster">
          Cụm rạp
        </InputLabel>
        <Select
          native
          value={theaterCluster}
          onChange={(e) => handleChange(e, "theaterCluster")}
          label="theaterCluster"
          inputProps={{
            name: "theaterCluster",
            id: "homeTools-input-theaterCluster",
          }}
        >
          <option value=" ">{isLoading ? "-- Loading --" : "-- Vui lòng chọn cụm rạp --"}</option>
          {listTheaterCluster &&
            listTheaterCluster.map((theaterCluster, index) => (
              <option value={theaterCluster} key={index}>
                {theaterCluster}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* Time */}
      <FormControl variant="outlined" className="homeTools-time">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-time">
          Giờ
        </InputLabel>
        <Select
          native
          value={time}
          onChange={(e) => handleChange(e, "time")}
          label="Time"
          inputProps={{
            name: "time",
            id: "homeTools-input-time",
          }}
        >
          <option value=" ">{isLoading ? "-- Loading --" : "-- Vui lòng chọn giờ --"}</option>
          {listTime &&
            listTime.map((time, index) => (
              <option value={time} key={index}>
                {` ${getDate(time)} - ${getHoursAndMins(time)} `}
              </option>
            ))}
        </Select>
      </FormControl>

      {/* Button */}
      <div className="homeTools-btn">
        <button className={idBooking ? "btn-booking-success" : "btn-booking-wating"} onClick={handleBooking}>
          Mua vé ngay
        </button>
      </div>
    </div>
  );
}
