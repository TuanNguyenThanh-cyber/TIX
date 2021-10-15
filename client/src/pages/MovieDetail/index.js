import React, { useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import AnimatedProgressProvider from "../../components/AnimatedProgressProvider";
import VideoPopUp from "../../components/VideoPopUp";
import { Grid } from "@material-ui/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import { Star, StarHalf } from "@material-ui/icons";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import "./moviedetail.scss";

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
      {value === index && children}
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

export default function MovieDetail() {
  // State Component
  const [isPopUp, setPopUp] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handlePopUpVideo = (idVideo) => {
    console.log(videoId);
    setPopUp(!isPopUp);
    setVideoId(idVideo);
  };

  // Material-UI
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <div id="movieDetail">
        {/* Movie Detail Top */}
        <div className="movieDetail-top">
          <img
            src="/img/Slider/trang-ti-16190592773054.jpg"
            alt=""
            className="movieDetail-background"
          />
          <div className="movieDetail-gradient"></div>
          <Grid container className="movieDetail-top-main">
            <Grid item xs={10} className="movieDetail-top-info">
              <div className="movieDetail-top-info-img">
                <img src="/img/trang-ti-16194120693380_215x318.jpg" alt="" />
              </div>

              <div className="movieDetail-top-info-detail">
                <div className="movieDetail-top-info-date">
                  <span>22.12.2000</span>
                </div>
                <div className="movieDetail-top-info-title">
                  <span className="movieDetail-top-info-age-type">P</span>
                  <span className="movieDetail-top-info-name">
                    Trạng Tí Phiêu Lưu Ký
                  </span>
                </div>
                <div className="movieDetail-top-info-time">
                  <span>120 phút - 0 IMDb - 2D/Digital</span>
                </div>
                <button
                  className="movieDetail-top-btn-trailer"
                  onClick={() => handlePopUpVideo("VTnGOjtaWAY")}
                >
                  Xem trailer
                </button>
              </div>
            </Grid>
            <Grid item xs={2} className="movieDetail-top-rating">
              <div>
                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={6}
                  duration={1.5}
                  easingFunction={easeQuadInOut}
                >
                  {(value) => {
                    const roundedValue = value.toFixed(1);
                    return (
                      <CircularProgressbar
                        value={value}
                        text={`${roundedValue}`}
                        styles={buildStyles({ pathTransition: "none" })}
                        minValue={0}
                        maxValue={10}
                      />
                    );
                  }}
                </AnimatedProgressProvider>
                <div className="movieDetail-top-rating-star">
                  <Star className="movieDetail-top-rating-icon" />
                  <Star className="movieDetail-top-rating-icon" />
                  <StarHalf className="movieDetail-top-rating-icon" />
                </div>

                <div className="movieDetail-top-rating-amount">
                  <span>200 người đánh giá</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* Movie Detail Bottom */}
        <div className="movieDetail-bottom">
          <div className="movieDetail-bottom-container">
            {/* Movie Detail Bottom Nav */}
            <AppBar position="static" className="movieDetail-bottom-nav">
              {/* Movie Detail Bottom Tabs */}
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { display: "none" } }}
                aria-label="simple tabs example"
                className="movieDetail-bottom-tabs"
              >
                <Tab
                  label="Thông tin"
                  disableRipple={true}
                  disableFocusRipple={true}
                  className="movieDetail-bottom-tab"
                  {...a11yProps(0)}
                />
                <Tab
                  label="Lịch chiếu"
                  disableRipple={true}
                  disableFocusRipple={true}
                  className="movieDetail-bottom-tab"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            {/* Movie Detail Bottom Content */}
            <TabPanel value={value} index={0}>
              <Grid
                container
                spacing={5}
                className="movieDetail-bottom-content"
              >
                <Grid item xs={6} className="movieDetail-bottom-content-left">
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Ngày công chiếu</p>
                    <p className="contentInfo">22.12.2000</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Đạo diễn</p>
                    <p className="contentInfo">Phan Gia Nhật Linh</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Diễn viên</p>
                    <p className="contentInfo">Phan Gia Nhật Linh</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Thể loại</p>
                    <p className="contentInfo">Hài hước</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Định dạng</p>
                    <p className="contentInfo">2D/Digital</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Quốc gia SX</p>
                    <p className="contentInfo">Việt Nam</p>
                  </div>
                </Grid>
                <Grid item xs={6} className="movieDetail-bottom-content-right">
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentTitle">Nội dung</p>
                  </div>
                  <div className="movieDetail-bottom-content-row">
                    <p className="contentInfo">
                      Trạng Tí chuyển thể từ truyện tranh nổi tiếng Thần đồng
                      đất Việt, xoay quanh Tí - cậu bé thông minh, láu lỉnh.
                      Cùng các bạn Sửu, Dần, Mẹo, cậu nhiều lần giúp triều đình
                      thoát khỏi các tình huống nguy hiểm, chống lại ngoại bang
                    </p>
                  </div>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="movieDetail-bottom-content">Content 2</div>
            </TabPanel>
          </div>
        </div>
      </div>
      {/* Video PopUp */}
      <VideoPopUp isPopUp={isPopUp} videoID={videoId} setPopUp={setPopUp} />
    </AppLayout>
  );
}
