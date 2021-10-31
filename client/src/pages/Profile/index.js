import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  TextField,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
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
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userApi from "../../services/userApi";
import Swal from "sweetalert2";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useHistory, useParams } from "react-router-dom";
import { getInfoUser } from "../../redux/actions/user";
import { formatMoneyVND } from "../../utils/formatMoneyVND";
import Empty from "../../components/Empty";
import "react-notifications/lib/notifications.css";
import "./profile.scss";

// Regex VietNam phone number
const phoneRegVn = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Schema validation Change Info
const schemaForChangeInfo = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  hoTen: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Không đúng định dạng email"),
  soDt: yup.string().required("Số điện thoại không được để trống"),
});

// Schema validation Change Password
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

// Tab Panel
// Function TabPanel
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

// TabPanel propTypes
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
// Style Tabpanel
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
}));

// Table Booking Movie
// Style Table
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

// Row
function Row(props) {
  const { ticket } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {ticket.tenPhim}
          </TableCell>
          <TableCell align="center">{ticket.thoiLuongPhim}</TableCell>
          <TableCell align="center">{ticket.ngayDat}</TableCell>
          <TableCell align="center">
            {formatMoneyVND(ticket.giaVe * ticket.danhSachGhe.length)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead style={{ backgroundColor: "#d8d8d8" }}>
                    <TableRow>
                      <TableCell align="left">Tên ghế</TableCell>
                      <TableCell align="center">Hệ thống rạp</TableCell>
                      <TableCell align="center">Tên hệ thống rạp</TableCell>
                      <TableCell align="center">Rạp</TableCell>
                      <TableCell align="right">Giá vé</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticket.danhSachGhe.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{item.tenGhe}</TableCell>
                        <TableCell align="center">
                          {item.maHeThongRap}
                        </TableCell>
                        <TableCell align="center">
                          {item.tenHeThongRap}
                        </TableCell>
                        <TableCell align="center">{item.tenRap}</TableCell>
                        <TableCell align="right">
                          {formatMoneyVND(ticket.giaVe)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    </React.Fragment>
  );
}

export default function Profile() {
  // State
  const classes = useStyles();
  const [tabHeader, setHeader] = useState(0);
  const [tabProfileMenu, setTabProfileMenu] = useState(0);
  const history = useHistory();
  const { idAccount } = useParams();
  const dispatch = useDispatch();

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
  } = useForm({
    resolver: yupResolver(schemaForChangePassword),
    mode: "onChange",
  });

  // Variable useSelector
  const { getInfoUserData } = useSelector((state) => state.getInfoUser);

  // Function

  // ChangeTabProfileMenu
  const handleChangeTabProfileMeunu = (event, newValue) => {
    setTabProfileMenu(newValue);
  };

  // ChangeTabMenu
  const handleChangeTabHeader = (event, newValue) => {
    setHeader(newValue);
  };

  // UpdateInfoUser
  const handleUpdateInfoUser = (value) => {
    const objToUpdateInfoUser = {
      ...value,
      maNhom: "GP15",
      matKhau: getInfoUserData?.matKhau,
      maLoaiNguoiDung: "KhachHang",
    };

    const updateUser = async () => {
      return await userApi.updateInfoUser(objToUpdateInfoUser);
    };

    updateUser()
      .then((res) => {
        dispatch(getInfoUser({ taiKhoan: res.data.taiKhoan }));
        return NotificationManager.success(
          "Cập nhật tài khoản thành công",
          "Thành công",
          1000
        );
      })
      .catch((err) => {
        return NotificationManager.error(err.response.data, "Thất bại", 1000);
      });
  };

  // ChangePassword
  const handleChangePassword = (value) => {
    // Create Obj To Change Password
    const objToChangePassword = {
      taiKhoan: getInfoUserData.taiKhoan,
      matKhau: value.matKhau,
      email: getInfoUserData.email,
      soDt: getInfoUserData.soDT,
      maNhom: getInfoUserData.maNhom,
      maLoaiNguoiDung: "KhachHang",
      hoTen: getInfoUserData.hoTen,
    };

    // Show popup warning
    Swal.fire({
      title: "Thay đổi mật khẩu với tài khoản này?",
      text: "Lưu ý: Vui lòng ghi nhớ mật khẩu vừa thay đổi, sau khi đổi mật khẩu thành công sẽ trở về trang đăng nhập",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đổi mật khẩu!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      // Accecpt to change password
      if (result.isConfirmed) {
        // Call Api to change password
        userApi
          .updateInfoUser(objToChangePassword)
          // Change password success
          .then((res) => {
            Swal.fire(
              "Thay đổi mật khẩu thành công!",
              "Quay trở lại trang đăng nhập!",
              "success"
            ).then((result) => {
              localStorage.removeItem("userInfo");
              history.push("/login");
            });
          })
          // Change password false
          .catch((err) => {
            return NotificationManager.error(err.response.data, "Thất bại");
          });
      }
    });
  };

  // Logout
  const handleLogout = () => {
    {
      Swal.fire({
        title: "Bạn có chắc đăng xuất ra khỏi tài khoản này?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng xuất!",
        cancelButtonText: "Thoát",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userInfo");
          history.push("/");
        }
      });
    }
  };

  // UseEffect

  // Check user isLogin => if not => go to the Login page
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      history.push("/login");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn không thể truy cập trang này vì lý do chưa đăng nhập, vui lòng đăng nhập để có thể truy cập!",
      });
    }
  });

  // Call api getInfoUser
  useEffect(() => {
    dispatch(getInfoUser({ taiKhoan: idAccount }));
  }, []);

  // After call api getInfoUser setValueForm
  useEffect(() => {
    setValueForChangeInfo("taiKhoan", getInfoUserData?.taiKhoan);
    setValueForChangeInfo("hoTen", getInfoUserData?.hoTen);
    setValueForChangeInfo("email", getInfoUserData?.email);
    setValueForChangeInfo("soDt", getInfoUserData?.soDT);
  }, [getInfoUserData]);

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
          <p className="profile-title-name">{getInfoUserData?.hoTen}</p>
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
                          Tài khoản: {getInfoUserData?.taiKhoan}
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
                          Họ Tên: {getInfoUserData?.hoTen}
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
                          Số điện thoại: {getInfoUserData?.soDT}
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
                          Email: {getInfoUserData?.email}
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
                          Mã nhóm: {getInfoUserData?.maNhom}
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
                          Mã loại: Khách Hàng
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

                      <div className="profile-content-change-info-btn">
                        <button type="submit" className="btn-change-info">
                          Cập nhật
                        </button>
                      </div>

                      {/* If change userInfo success or false show notification here */}
                      <NotificationContainer />
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
            <div className="profile-info-booking">
              {getInfoUserData?.thongTinDatVe.length === 0 ? (
                <Empty>
                  <span style={{ display: "block" }}>
                    Mọi vé bạn đặt sẽ được hiển thị tại đây.
                  </span>
                  <span style={{ display: "block" }}>
                    Hiện bạn chưa có bất kỳ đặt vé nào, hãy đặt trên trang chủ
                    ngay!
                  </span>
                </Empty>
              ) : (
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: "#fb4226" }}>
                      <TableRow>
                        <TableCell style={{ color: "white" }} />
                        <TableCell style={{ color: "white" }}>
                          Tên phim
                        </TableCell>
                        <TableCell style={{ color: "white" }} align="center">
                          Thời lượng phim (phút)
                        </TableCell>
                        <TableCell style={{ color: "white" }} align="center">
                          Ngày đặt
                        </TableCell>
                        <TableCell style={{ color: "white" }} align="center">
                          Tổng tiền
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="profile-info-booking-table-body">
                      {/* Row booking info */}
                      {getInfoUserData?.thongTinDatVe.map((ticket, index) => (
                        <Row key={index} ticket={ticket} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
