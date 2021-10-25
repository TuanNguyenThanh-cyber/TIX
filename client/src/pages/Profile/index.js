import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Grid, TextField } from "@material-ui/core";
import {
  AccountBox,
  AccountCircle,
  Call,
  Email,
  ExitToApp,
  Lock,
  LockOpen,
  Person,
  PersonPin,
  VerifiedUser,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./profile.scss";

// Regex VietNam phone number
const phoneRegVn = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Tạo schema validation
const schemaForChangeInfo = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  hoTen: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Không đúng định dạng email"),
  soDt: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(phoneRegVn, "Không đúng định dạng số điện thoại"),
  maLoaiNguoiDung: yup.string(),
});

const schemaForChangePassword = yup.object().shape({
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải từ 8 kí tự trở lên"),
  nhapLaiMatKhau: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("matKhau"), null], "Không trùng khớp với mật khẩu"),
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
}));

export default function Profile() {
  // State
  const classes = useStyles();
  const [tabHeader, setHeader] = useState(0);
  const [tabProfileMenu, setTabProfileMenu] = useState(0);
  const [province, setProvince] = useState("");
  const history = useHistory();

  // Variable For Change Info
  const {
    register: registerForChangeInfo,
    handleSubmit: handleSubmitForChangeInfo,
    formState: { errors: errorsForChangeInfo },
    setValue: setValueForChangeInfo,
  } = useForm({
    resolver: yupResolver(schemaForChangeInfo),
    mode: "onChange",
  });

  // Variable For Change Info
  const {
    register: registerForChangePassword,
    handleSubmit: handleSubmitForChangePassword,
    formState: { errors: errorsForChangePassword },
    setValue: setValueForChangePassword,
  } = useForm({
    resolver: yupResolver(schemaForChangePassword),
    mode: "onChange",
  });

  // Function
  const handleChangeTabProfileMeunu = (event, newValue) => {
    setTabProfileMenu(newValue);
  };

  const handleChangeTabHeader = (event, newValue) => {
    setHeader(newValue);
  };

  const handleUpdateInfoUser = (value) => {
    console.log(value);
  };

  const handleChangePassword = (value) => {
    console.log(value);
  };

  const handleChangeProvince = (e) => {
    setProvince(e.target.value);
  };

  const handleLogout = () => {
    {
      Swal.fire({
        title: "Are you sure to log out of this account?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userInfo");
          history.push("/");
        }
      });
    }
  };

  // UseEffect setValue input
  useEffect(() => {
    setValueForChangeInfo("taiKhoan", "Vũ Thị Ngọc Minh");
    setValueForChangeInfo("hoTen", "Vũ Thị Ngọc Minh");
    setValueForChangeInfo("email", "minh@gmail.com");
    setValueForChangeInfo("soDt", "0868056658");
    setValueForChangeInfo("maLoaiNguoiDung", "Khách Hàng");
  }, []);

  return (
    <div id="profile">
      <div className="profile-container">
        {/* Background and Image */}
        <div
          className="profile-background"
          style={{ backgroundImage: "url(/img/bg-profile.jpg)" }}
        >
          <img src="/img/Header/avatar.png" className="profile-avatar" alt="" />
        </div>

        <div className="profile-title">
          <p className="profile-title-name">Vũ Thị Ngọc Minh</p>
          <p className="profile-title-user-type">Khách Hàng</p>
        </div>

        {/* Tabs */}
        <div className={classes.root}>
          <AppBar position="static" className="profile-appbar">
            <Tabs
              value={tabHeader}
              onChange={handleChangeTabHeader}
              aria-label="simple tabs example"
              className="profile-tabs"
            >
              <Tab
                label="Thông tin tài khoản"
                {...a11yProps(0)}
                className="profile-tab"
              />
              <Tab
                label="Thông tin đặt vé"
                {...a11yProps(1)}
                className="profile-tab"
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tabHeader} index={0}>
            {/* Tab 1 */}
            <div className="profile-account">
              <Tabs
                orientation="vertical"
                value={tabProfileMenu}
                onChange={handleChangeTabProfileMeunu}
                className="profile-menu-tabs"
              >
                {/* Thông tin cá nhân Tab */}
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <AccountCircle className="profile-menu-icon" />
                      <span className="profile-menu-title">
                        Thông tin cá nhân
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(0)}
                />
                {/* Thay đổi thông tin Tab */}
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <Person className="profile-menu-icon" />
                      <span className="profile-menu-title">
                        Thay đổi thông tin
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(1)}
                />
                {/* Thay đổi mật khẩu Tab */}
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <LockOpen className="profile-menu-icon" />
                      <span className="profile-menu-title">
                        Thay đổi mật khẩu
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(2)}
                />
                {/* Đăng xuất Tab */}
                <Tab
                  label={
                    <div className="profile-menu-line profile-menu-logout">
                      <ExitToApp className="profile-menu-icon" />
                      <span className="profile-menu-title">Đăng xuất</span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(3)}
                  onClick={handleLogout}
                />
              </Tabs>
              {/* Thông tin cá nhân TabPanel */}
              <TabPanel
                value={tabProfileMenu}
                index={0}
                className="profile-content"
              >
                <div className="profile-content-container">
                  <div className="profile-content-info">
                    <p className="profile-content-info-title">
                      Thông tin cá nhân
                    </p>

                    <Grid
                      container
                      spacing={2}
                      className="profile-content-info-line"
                    >
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <AccountBox className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Tài khoản: Vũ Thị Ngọc Minh
                        </span>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <Person className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Họ Tên: Vũ Thị Ngọc Minh
                        </span>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      className="profile-content-info-line"
                    >
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <Call className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Số điện thoại: 0868056658
                        </span>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <Email className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Email: minh@gmail.com
                        </span>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      className="profile-content-info-line"
                    >
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <PersonPin className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Mã nhóm: GP10
                        </span>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className="profile-content-info-line-item"
                      >
                        <div className="profile-content-info-icon">
                          <VerifiedUser className="profile-icon" />
                        </div>
                        <span className="profile-content-info-text">
                          Mã loại: Khách hàng
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </TabPanel>
              {/* Thay đổi thông tin TabPanel */}
              <TabPanel
                value={tabProfileMenu}
                index={1}
                className="profile-content"
              >
                <div className="profile-content-container">
                  <div className="profile-content-change-info">
                    <p className="profile-content-change-info-title">
                      Thay đổi thông tin
                    </p>
                    <form
                      onSubmit={handleSubmitForChangeInfo(handleUpdateInfoUser)}
                      className="profile-content-change-info-form"
                    >
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <AccountBox className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-info-input"
                          label="Tài khoản"
                          variant="outlined"
                          inputProps={{ ...registerForChangeInfo("taiKhoan") }}
                        />
                      </div>
                      {errorsForChangeInfo.taiKhoan && (
                        <Alert severity="error">
                          {errorsForChangeInfo.taiKhoan.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <Person className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-info-input"
                          label="Họ tên"
                          variant="outlined"
                          inputProps={{ ...registerForChangeInfo("hoTen") }}
                        />
                      </div>
                      {errorsForChangeInfo.hoTen && (
                        <Alert severity="error">
                          {errorsForChangeInfo.hoTen.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <Email className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-info-input"
                          label="Email"
                          variant="outlined"
                          inputProps={{ ...registerForChangeInfo("email") }}
                        />
                      </div>
                      {errorsForChangeInfo.email && (
                        <Alert severity="error">
                          {errorsForChangeInfo.email.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <Call className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-info-input"
                          label="Số điện thoại"
                          variant="outlined"
                          inputProps={{ ...registerForChangeInfo("soDt") }}
                        />
                      </div>
                      {errorsForChangeInfo.soDt && (
                        <Alert severity="error">
                          {errorsForChangeInfo.soDt.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <PersonPin className="profile-icon" />
                        </div>
                        <select
                          className="profile-content-change-info-select"
                          onChange={handleChangeProvince}
                          defaultValue="GP03"
                        >
                          <option value="GP02">Thành phố Hồ Chí Minh</option>
                          <option value="GP03">Hà Nội</option>
                          <option value="GP04">Đà Nẵng</option>
                          <option value="GP05">Hải Phòng</option>
                          <option value="GP06">Nha Trang</option>
                          <option value="GP07">Cần Thơ</option>
                          <option value="GP08">Vũng Tàu</option>
                          <option value="GP09">Thái Bình</option>
                          <option value="GP10">Long An</option>
                        </select>
                      </div>
                      <div className="profile-content-change-info-line">
                        <div className="profile-content-change-info-icon">
                          <VerifiedUser className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-info-input"
                          label="Mã loại người dùng"
                          variant="outlined"
                          inputProps={{
                            ...registerForChangeInfo("maLoaiNguoiDung"),
                          }}
                          disabled
                        />
                      </div>
                      <div className="profile-content-change-info-btn">
                        <button type="submit" className="btn-change-info">
                          Cập nhật
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPanel>
              {/* Thay đổi mật khẩu TabPanel */}
              <TabPanel
                value={tabProfileMenu}
                index={2}
                className="profile-content"
              >
                <div className="profile-content-container">
                  <div className="profile-content-change-password">
                    <p className="profile-content-change-password-title">
                      Thay đổi mật khẩu
                    </p>
                    <form
                      onSubmit={handleSubmitForChangePassword(
                        handleChangePassword
                      )}
                      className="profile-content-change-password-form"
                    >
                      <div className="profile-content-change-password-line">
                        <div className="profile-content-change-password-icon">
                          <Lock className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-password-input"
                          label="Nhập mật khẩu mới"
                          variant="outlined"
                          type="password"
                          inputProps={{
                            ...registerForChangePassword("matKhau"),
                          }}
                        />
                      </div>
                      {errorsForChangePassword.matKhau && (
                        <Alert severity="error">
                          {errorsForChangePassword.matKhau.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-password-line">
                        <div className="profile-content-change-password-icon">
                          <LockOpen className="profile-icon" />
                        </div>
                        <TextField
                          className="profile-content-change-password-input"
                          label="Nhập lại mật khẩu"
                          variant="outlined"
                          type="password"
                          inputProps={{
                            ...registerForChangePassword("nhapLaiMatKhau"),
                          }}
                        />
                      </div>
                      {errorsForChangePassword.nhapLaiMatKhau && (
                        <Alert severity="error">
                          {errorsForChangePassword.nhapLaiMatKhau.message}
                        </Alert>
                      )}
                      <div className="profile-content-change-password-btn">
                        <button type="submit" className="btn-change-password">
                          Xác nhận
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabPanel>
              {/* Đăng xuất TabPanel */}
              <TabPanel
                value={tabProfileMenu}
                index={3}
                className="profile-content"
              ></TabPanel>
            </div>
          </TabPanel>
          <TabPanel value={tabHeader} index={1}>
            {/* Tab 2 */}
            Tab 2
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
