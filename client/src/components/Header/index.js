import React, { useState, useEffect, useRef, useCallback } from "react";
import { LocationOnOutlined, ArrowDropDownOutlined } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { arrayProvinces } from "../../FakeData";
import "./header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [province, setProvince] = useState("Hồ Chí Minh");
  const [gp, setGp] = useState("GP01"); // gp: That is a querystring (maNhom) to callAPI getAllMovies
  const dropdownRef = useRef(null);

  console.log(open);

  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleChooseProvince = (province, e) => {
    e.preventDefault();
    setProvince(province.name);
    setGp(province.value);
    handleToggle();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleToggle();
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, handleToggle]);

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
        <div className="header-right-location" onClick={handleToggle}>
          <LocationOnOutlined className="header-right-location-icon"></LocationOnOutlined>
          <span className="header-right-location-name">{province}</span>
          <ArrowDropDownOutlined className="header-right-location-icon"></ArrowDropDownOutlined>
          {open && (
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