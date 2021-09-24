import React, { useState, useEffect } from "react";
import { arrayLogo, arrayTheaterCluster, arrayMovies } from "../../FakeData";
import "./verticaltabmovie.scss";

export default function VerticalTabMovie() {
  const [indexTheater, setIndexTheater] = useState(0);
  const [indexTheaterCluster, setIndexTheaterCluster] = useState(0);

  const handleChangeItem = (e, index, type) => {
    e.preventDefault();
    switch (type) {
      case "logo":
        setIndexTheater(index);
        break;
      case "theaterCluster":
        setIndexTheaterCluster(index);
        break;
      default:
        break;
    }
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

  useEffect(() => {
    setIndexTheaterCluster(0);
  }, [indexTheater]);

  return (
    <div id="verticalTabMovie">
      {/* Tab 1 */}
      <ul className="listLogoCinema">
        {arrayLogo.map((logo, index) => (
          <li className="listLogoCinema-item" key={index}>
            <a
              href="/"
              className={styleActive(index, "logo")}
              onClick={(e) => handleChangeItem(e, index, "logo")}
            >
              <img src={logo.img} alt="" className="listLogoCinema-img" />
            </a>
          </li>
        ))}
      </ul>

      {/* Tab 2 */}
      <div className="listTheaterCluster">
        {arrayTheaterCluster.map((theaterCluster, index) => (
          <div
            className={styleActive(index, "theaterCluster")}
            onClick={(e) => handleChangeItem(e, index, "theaterCluster")}
            key={index}
          >
            <img src={theaterCluster.img} alt="" />
            <div className="theaterCluster-info">
              <span className="theaterCluster-name">DDC - Đống Đa</span>
              <span className="theaterCluster-address">
                L3-Bitexco Icon 68, 2 Hải Triều, Q.1
              </span>
              <a href="/" className="theaterCluster-detail">
                [chi tiết]
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tab 3 */}
      <div className="listMovie">
        {arrayMovies.map((movie, index) => (
          <div className="listMovie-item" key={index}>
            <div className="listMovie-item-content">
              <img src={movie.img} alt="" />
              <div className="listMovie-item-info">
                <span className="listMovie-item-info-age">P</span>
                <span className="listMovie-item-info-name">
                  Ted and his friend 2
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
                <span className="listMovie-item-booking-time-start">10:00</span>{" "}
                - 11:30
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
