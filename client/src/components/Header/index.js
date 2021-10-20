import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeGp } from "../../redux/actions/gp";
import { LocationOnOutlined, ArrowDropDownOutlined } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { arrayProvinces } from "../../FakeData";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [province, setProvince] = useState("Hồ Chí Minh");
  const [gp, setGp] = useState("GP02"); // gp: That is a querystring (maNhom) to callAPI getAllMovies
  const history = useHistory();
  const dropdownRef = useRef(null);

  const infoUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const dispatch = useDispatch();

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
    dispatch(changeGp(gp));
  }, [gp, dispatch]);

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

  const handleGoToLogin = (e) => {
    e.preventDefault();
    if (!infoUser) {
      history.push("/login");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    history.go(0);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      id="header"
    >
      <Grid item className="header-left">
        <Link to="/">
          <img src="/img/Header/web-logo.png" alt="" />
        </Link>
      </Grid>
      <Grid item className="header-center">
        <ul>
          <li>
            <a href="#homeMovie">Lịch chiếu</a>
          </li>
          <li>
            <a href="#homeBookingMovie">Cụm rạp</a>
          </li>
          <li>
            <a href="#homeNews">Tin tức</a>
          </li>
          <li>
            <a href="#appHome">Ứng dụng</a>
          </li>
        </ul>
      </Grid>
      <Grid item className="header-right">
        <button className="header-right-account" onClick={handleGoToLogin}>
          <img src="/img/Header/avatar.png" alt="" />
          <span className="header-right-account-name">
            {infoUser ? infoUser.taiKhoan : "Đăng nhập"}
          </span>
          {infoUser && (
            <div className="header-right-setting">
              <ul>
                <li>
                  <Link to={`/profile/${infoUser?.taiKhoan}`}>
                    Thông tin tài khoản
                  </Link>
                </li>
                <li>
                  <a href="" onClick={handleLogout}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          )}
        </button>
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
