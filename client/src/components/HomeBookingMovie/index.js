import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheaterSystem,
  getInfoTheaterSystemShowtimes,
} from "../../redux/actions/theater";
import { getHoursAndMins, getDate } from "../../utils/separateDayAndTime";
import "./homebookingmovie.scss";

export default function HomeBookingMovie() {
  // State in component
  const [indexTheater, setIndexTheater] = useState(0);
  const [indexTheaterCluster, setIndexTheaterCluster] = useState(0);
  const [idTheaterSystem, setIdTheaterSystem] = useState("BHDStar");
  const [idTheaterCluster, setIdTheaterCluster] = useState(
    "bhd-star-cineplex-bitexco"
  );
  const [arrayMovieTab3, setArrayMovieTab3] = useState([]); // Array movie for tab 3

  // State in reducer
  const { theaterSystemData } = useSelector((state) => state.getTheaterSystem);
  const { gp } = useSelector((state) => state.changeGp);
  const { theaterSystemShowtimesData } = useSelector(
    (state) => state.getInfoTheaterSystemShowtimes
  );

  // useDispatch()
  const dispatch = useDispatch();

  const handleChangeTheaterSystem = (e, index, maHeThongRap) => {
    e.preventDefault();
    setIndexTheater(index);
    setIndexTheaterCluster(0);
    setIdTheaterSystem(maHeThongRap);
  };

  const handleChangeTheaterCluster = (e, index, maCumRap) => {
    e.preventDefault();
    setIndexTheaterCluster(index);
    setIdTheaterCluster(maCumRap);
  };

  const styleActive = (index, type) => {
    switch (type) {
      case "logo":
        if (indexTheater === index) {
          return "listLogoCinema-link active";
        }
        return "listLogoCinema-link";
      case "theaterCluster":
        if (indexTheaterCluster === index) {
          return "listTheaterCluster-item active";
        }
        return "listTheaterCluster-item";
      default:
        break;
    }
  };

  // When component render call api get all theater system
  useEffect(() => {
    dispatch(getTheaterSystem());
  }, [dispatch]);

  // When idTheaterSystem, gp changed => call api => get all cluster theater, film, setIdTheaterCluster : based on idTheaterSystem and gp
  useEffect(() => {
    dispatch(getInfoTheaterSystemShowtimes(idTheaterSystem, gp));
    switch (idTheaterSystem) {
      case "BHDStar":
        setIdTheaterCluster("bhd-star-cineplex-bitexco");
        break;
      case "CGV":
        setIdTheaterCluster("cgv-aeon-binh-tan");
        break;
      case "CineStar":
        setIdTheaterCluster("cns-hai-ba-trung");
        break;
      case "Galaxy":
        setIdTheaterCluster("glx-kinh-duong-vuong");
        break;
      case "LotteCinima":
        setIdTheaterCluster("lotte-cantavil");
        break;
      case "MegaGS":
        setIdTheaterCluster("megags-cao-thang");
        break;
      default:
        break;
    }
  }, [gp, idTheaterSystem, dispatch]);

  // When theaterSystemShowtimesData and idTheaterCluster changed, update new arrayMovie
  useEffect(() => {
    if (theaterSystemShowtimesData) {
      theaterSystemShowtimesData[0].lstCumRap.map((theaterCluster, index) => {
        if (theaterCluster.maCumRap === idTheaterCluster) {
          setArrayMovieTab3([...theaterCluster.danhSachPhim]);
        }
      });
    }
  }, [theaterSystemShowtimesData, idTheaterCluster]);

  return (
    <div id="homeBookingMovie">
      {/* Tab 1 */}
      <ul className="listLogoCinema">
        {theaterSystemData &&
          theaterSystemData.map((theaterSystem, index) => (
            <li className="listLogoCinema-item" key={index}>
              <a
                href="/"
                className={styleActive(index, "logo")}
                onClick={(e) =>
                  handleChangeTheaterSystem(
                    e,
                    index,
                    theaterSystem.maHeThongRap
                  )
                }
              >
                <img
                  src={theaterSystem.logo}
                  alt={theaterSystem.tenHeThongRap}
                  className="listLogoCinema-img"
                />
              </a>
            </li>
          ))}
      </ul>

      {/* Tab 2 */}
      <div className="listTheaterCluster">
        {theaterSystemShowtimesData &&
          theaterSystemShowtimesData[0].lstCumRap.map(
            (theaterCluster, index) => (
              <div
                className={styleActive(index, "theaterCluster")}
                onClick={(e) =>
                  handleChangeTheaterCluster(e, index, theaterCluster.maCumRap)
                }
                key={index}
              >
                <div className="theaterCluster-info">
                  <span className="theaterCluster-name">
                    {theaterCluster.tenCumRap}
                  </span>
                  <span className="theaterCluster-address">
                    {theaterCluster.diaChi}
                  </span>
                  <a href="/" className="theaterCluster-detail">
                    [chi tiết]
                  </a>
                </div>
              </div>
            )
          )}
      </div>

      {/* Tab 3 */}
      <div className="listMovie">
        {arrayMovieTab3.map((movie, index) => (
          <div className="listMovie-item" key={index}>
            <div className="listMovie-item-content">
              <img src={movie.hinhAnh} alt="" />
              <div className="listMovie-item-info">
                <span className="listMovie-item-info-age">P</span>
                <span className="listMovie-item-info-name">
                  {movie.tenPhim}
                </span>
                <p className="listMovie-item-info-time">
                  120 phút - TIX 9.4 - IMDb 8.7
                </p>
              </div>
            </div>
            <div className="listMovie-item-typeMovie">
              <span>2D Digital</span>
            </div>
            {movie.lstLichChieuTheoPhim.map((showtime, item) => (
              <div className="listMovie-item-booking" key={item}>
                <button className="listMovie-item-booking-time">
                  <span className="listMovie-item-booking-time-start">
                    {getHoursAndMins(showtime.ngayChieuGioChieu)}
                  </span>
                  - {getHoursAndMins(showtime.ngayChieuGioChieu, 2)}
                  <p className="listMovie-item-booking-day">
                    Ngày chiếu: {getDate(showtime.ngayChieuGioChieu)}
                  </p>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
