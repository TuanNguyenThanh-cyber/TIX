import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheaterSystem,
  getInfoTheaterSystemShowtimes,
} from "../../redux/actions/theater";
import "./homebookingmovie.scss";

export default function HomeBookingMovie() {
  // State in component
  const [indexTheater, setIndexTheater] = useState(0);
  const [indexTheaterCluster, setIndexTheaterCluster] = useState(0);
  const [idTheaterSystem, setIdTheaterSystem] = useState("BHDStar");
  const [idTheaterCluster, setIdTheaterCluster] = useState(
    "bhd-star-cineplex-bitexco"
  );

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
  }, []);

  // When indexTheater change => setIndexTheaterCluster = 0
  useEffect(() => {
    setIndexTheaterCluster(0);
  }, [indexTheater]);

  // When idTheaterSystem, gp changed call api get all cluster theater, all film based on idTheaterSystem and gp
  useEffect(() => {
    dispatch(getInfoTheaterSystemShowtimes(idTheaterSystem, gp));
  }, [gp, idTheaterSystem]);

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
        {theaterSystemShowtimesData &&
          theaterSystemShowtimesData[0].lstCumRap.map(
            (theaterCluster, index) => {
              // Compare maCumRap and idTheaterCluster to get all movie depend on idTheaterCluster
              if (theaterCluster.maCumRap === idTheaterCluster) {
                theaterCluster.danhSachPhim.map((movie, index) => {
                  return (
                    // Render UI
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
                      <div className="listMovie-item-booking">
                        <button className="listMovie-item-booking-time">
                          <span className="listMovie-item-booking-time-start">
                            10:00
                          </span>{" "}
                          - 11:30
                        </button>
                      </div>
                    </div>
                    // Render UI
                  );
                });
              }
            }
          )}
      </div>
    </div>
  );
}
