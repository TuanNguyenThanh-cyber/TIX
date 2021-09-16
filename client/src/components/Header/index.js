import React, { useState, useEffect, useRef, useCallback } from "react";
import "./header.scss";
import { LocationOnOutlined, ArrowDropDownOutlined } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

const arrayProvinces = [
  {
    name: "Hồ Chí Minh",
    value: "GP01",
  },
  {
    name: "Hà Nội",
    value: "GP02",
  },
  {
    name: "Đà Nẵng",
    value: "GP03",
  },
  {
    name: "Hải Phòng",
    value: "GP04",
  },
  {
    name: "Biên Hòa",
    value: "GP05",
  },
  {
    name: "Nha Trang",
    value: "GP06",
  },
  {
    name: "Cần Thơ",
    value: "GP07",
  },
  {
    name: "Vũng Tàu",
    value: "GP08",
  },
  {
    name: "Thái Bình",
    value: "GP09",
  },
  {
    name: "Long An",
    value: "GP10",
  },
  {
    name: "Hải Dương",
    value: "GP11",
  },
  {
    name: "Gia Lai",
    value: "GP12",
  },
  {
    name: "Hà Tĩnh",
    value: "GP13",
  },
  {
    name: "Phú Yên",
    value: "GP14",
  },
  {
    name: "Mỹ Tho",
    value: "GP15",
  },
];

export default function Header() {
  const [isDropdown, setIsDropdown] = useState(false);
  const [province, setProvince] = useState("Hồ Chí Minh");
  const [gp, setGp] = useState("GP01"); // gp: That is a querystring (maNhom) to callAPI getAllMovies
  const dropdownRef = useRef(null);

  const handleDropdown = useCallback(() => {
    setIsDropdown(!isDropdown);
  }, [isDropdown]);

  const handleChooseProvince = (province, e) => {
    e.preventDefault();
    setProvince(province.name);
    setGp(province.value);
    handleDropdown();
  };

  useEffect(() => {
    if (isDropdown) {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          handleDropdown();
        }
      }
      // Bind the event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isDropdown, handleDropdown]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="header"
    >
      <Grid item className="header-left">
        <a href="/">
          <img src="/img/web-logo.png" alt="" />
        </a>
      </Grid>
      <Grid item className="header-center">
        <ul>
          <li>
            <a href="/">Lịch chiếu</a>
          </li>
          <li>
            <a href="/">Cụm rạp</a>
          </li>
          <li>
            <a href="/">Tin tức</a>
          </li>
          <li>
            <a href="/">Ứng dụng</a>
          </li>
        </ul>
      </Grid>
      <Grid item className="header-right">
        <div className="header-right-account">
          <img src="/img/avatar.png" alt="" />
          <span className="header-right-account-name">Đăng nhập</span>
        </div>
        <div className="header-right-location" onClick={handleDropdown}>
          <LocationOnOutlined className="header-right-location-icon"></LocationOnOutlined>
          <span className="header-right-location-name">{province}</span>
          <ArrowDropDownOutlined className="header-right-location-icon"></ArrowDropDownOutlined>
          {isDropdown && (
            <ul className="dropdown-menu selectScroll" ref={dropdownRef}>
              {arrayProvinces.map((province) => (
                <li key={province.value}>
                  <a
                    onClick={(e) => handleChooseProvince(province, e)}
                    href="/"
                  >
                    {province.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
