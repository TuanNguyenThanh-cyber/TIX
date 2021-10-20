import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";
import {
  AccountBox,
  AccountCircle,
  Call,
  Email,
  ExitToApp,
  LockOpen,
  Person,
  PersonPin,
  VerifiedUser,
} from "@material-ui/icons";
import "./profile.scss";

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
  const classes = useStyles();
  const [tabHeader, setHeader] = useState(0);
  const [tabProfileMenu, setTabProfileMenu] = useState(0);

  const handleChangeTabProfileMeunu = (event, newValue) => {
    setTabProfileMenu(newValue);
  };

  const handleChangeTabHeader = (event, newValue) => {
    setHeader(newValue);
  };

  const handleProfileMenu = (e) => {};

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
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <AccountCircle className="profile-menu-icon" />
                      <span classNam="profile-menu-title">
                        Thông tin cá nhân
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <Person className="profile-menu-icon" />
                      <span classNam="profile-menu-title">
                        Thay đổi thông tin
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <div className="profile-menu-line">
                      <LockOpen className="profile-menu-icon" />
                      <span classNam="profile-menu-title">
                        Thay đổi mật khẩu
                      </span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(2)}
                />
                <Tab
                  label={
                    <div className="profile-menu-line profile-menu-logout">
                      <ExitToApp className="profile-menu-icon" />
                      <span classNam="profile-menu-title">Đăng xuất</span>
                    </div>
                  }
                  className="profile-menu-tab"
                  {...a11yProps(3)}
                />
              </Tabs>
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
                        <span classNam="profile-content-info-text">
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
                        <span classNam="profile-content-info-title">
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
                        <span classNam="profile-content-info-title">
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
                        <span classNam="profile-content-info-title">
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
                        <span classNam="profile-content-info-title">
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
                        <span classNam="profile-content-info-title">
                          Mã loại: Khách hàng
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                value={tabProfileMenu}
                index={1}
                className="profile-content"
              >
                Item Two
              </TabPanel>
              <TabPanel
                value={tabProfileMenu}
                index={2}
                className="profile-content"
              >
                Item Three
              </TabPanel>
              <TabPanel
                value={tabProfileMenu}
                index={3}
                className="profile-content"
              >
                Item Four
              </TabPanel>
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
