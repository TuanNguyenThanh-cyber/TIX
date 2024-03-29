import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getHoursAndMins, getDate } from "../../utils/separateDayAndTime";
import getVideoIdYoutube from "../../utils/getVideoIdYoutube";
import AppLayout from "../../layouts/AppLayout";
import AnimatedProgressProvider from "../../components/AnimatedProgressProvider";
import LoadingPage from "../../components/LoadingPage";
import VideoPopUp from "../../components/VideoPopUp";
import { getMovieDetail } from "../../redux/actions/movie";
import { Grid } from "@material-ui/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import { Star, StarHalf } from "@material-ui/icons";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import "./moviedetail.scss";
import BackToTop from "../../components/BackToTop";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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
  // Variable
  const [isPopUp, setPopUp] = useState(false);
  const [videoId, setVideoId] = useState("");
  const dispatch = useDispatch();
  const { getMovieDetailData, isLoading } = useSelector((state) => state.getMovieDetail);
  const { idMovie } = useParams();
  const [listTheater, setListTheater] = useState([]);
  const [listTheaterCluster, setListTheaterCluster] = useState([]);
  const [chooseTheater, setChooseTheater] = useState("");
  const handlePopUpVideo = (idVideo) => {
    console.log(videoId);
    setPopUp(!isPopUp);
    setVideoId(idVideo);
  };
  const history = useHistory();

  useEffect(() => {
    dispatch(getMovieDetail(idMovie));
    window.scrollTo(0, 0);
  }, []);

  // Material-UI
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Style Active Theater
  const styleActive = (theaterName) => {
    if (chooseTheater === theaterName) {
      return "movieDetail-bottom-showtime-left-link active";
    } else {
      return "movieDetail-bottom-showtime-left-link";
    }
  };

  // handleChangeIndexTheater
  const handleChangeTheater = (e, theaterName) => {
    e.preventDefault();
    setChooseTheater(theaterName);
  };

  // Handle showtimes movie
  useEffect(() => {
    if (isLoading === false && getMovieDetailData !== null) {
      getMovieDetailData.lichChieu.map((showtime) => {
        if (!listTheater.includes(showtime.thongTinRap.maHeThongRap)) {
          setListTheater([...listTheater, showtime.thongTinRap.maHeThongRap]);
        }
      });
    }
  });

  useEffect(() => {
    if (listTheater.length !== 0) {
      setChooseTheater(listTheater[0]);
    }
  }, [listTheater]);

  useEffect(() => {
    if (isLoading === false && getMovieDetailData !== null) {
      let arrayTheater = getMovieDetailData?.lichChieu.filter((showtime) => {
        return showtime.thongTinRap.maHeThongRap === chooseTheater;
      });
      let arrayTheaterCluster = [];
      getMovieDetailData.lichChieu.map((showtime) => {
        if (showtime.thongTinRap.maHeThongRap === chooseTheater) {
          if (arrayTheaterCluster.length === 0) {
            arrayTheaterCluster.push(showtime.thongTinRap.tenCumRap);
          } else {
            if (!arrayTheaterCluster.includes(showtime.thongTinRap.tenCumRap)) {
              arrayTheaterCluster.push(showtime.thongTinRap.tenCumRap);
            }
          }
        }
      });
      let result = [];

      arrayTheaterCluster.map((itemTheaterCluster) => {
        let arrayFilterByTheaterCluster = arrayTheater.filter((itemTheater) => {
          return itemTheater.thongTinRap.tenCumRap === itemTheaterCluster;
        });
        result.push(arrayFilterByTheaterCluster);
      });

      setListTheaterCluster(result);
    }
  }, [chooseTheater, getMovieDetailData]);

  // Handle Booking Movie
  const handleBookingMovie = (e, idShowtime) => {
    history.push(`/bookingMovie/${idShowtime}`);
  };

  console.log(listTheaterCluster);
  return (
    <AppLayout>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>
          <BackToTop showBelow={250} />
          <div id="movieDetail">
            {/* Movie Detail Top */}
            <div className="movieDetail-top">
              <img src={getMovieDetailData?.hinhAnh} alt="" className="movieDetail-background" />
              <div className="movieDetail-gradient"></div>
              <Grid container className="movieDetail-top-main">
                <Grid item xs={10} className="movieDetail-top-info">
                  <div className="movieDetail-top-info-img">
                    <img src={getMovieDetailData?.hinhAnh} alt="" />
                  </div>

                  <div className="movieDetail-top-info-detail">
                    <div className="movieDetail-top-info-date">
                      <span>{getDate(getMovieDetailData?.ngayKhoiChieu)}</span>
                    </div>
                    <div className="movieDetail-top-info-title">
                      <span className="movieDetail-top-info-age-type">P</span>
                      <span className="movieDetail-top-info-name">{getMovieDetailData?.tenPhim}</span>
                    </div>
                    <div className="movieDetail-top-info-time">
                      <span>120 phút - 6.4 IMDb - 2D/Digital</span>
                    </div>
                    <button className="movieDetail-top-btn-trailer" onClick={() => handlePopUpVideo(getVideoIdYoutube(getMovieDetailData?.trailer))}>
                      Xem trailer
                    </button>
                  </div>
                </Grid>
                <Grid item xs={2} className="movieDetail-top-rating">
                  {getMovieDetailData?.danhGia && (
                    <div>
                      <AnimatedProgressProvider valueStart={0} valueEnd={getMovieDetailData?.danhGia} duration={1.5} easingFunction={easeQuadInOut}>
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
                        {[...Array(Math.floor(getMovieDetailData?.danhGia / 2))].map((star, index) => {
                          return <Star className="movieDetail-top-rating-icon" key={index}></Star>;
                        })}
                        {getMovieDetailData?.danhGia % 2 !== 0 && <StarHalf className="movieDetail-top-rating-icon"></StarHalf>}
                      </div>

                      <div className="movieDetail-top-rating-amount">
                        <span>200 người đánh giá</span>
                      </div>
                    </div>
                  )}
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
                    <Tab label="Thông tin" disableRipple={true} disableFocusRipple={true} className="movieDetail-bottom-tab" {...a11yProps(0)} />
                    <Tab label="Lịch chiếu" disableRipple={true} disableFocusRipple={true} className="movieDetail-bottom-tab" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                {/* Movie Detail Bottom Content */}
                <TabPanel value={value} index={0}>
                  <Grid container spacing={5} className="movieDetail-bottom-content">
                    <Grid item xs={6} className="movieDetail-bottom-content-left">
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Ngày công chiếu</p>
                        <p className="contentInfo">{getDate(getMovieDetailData?.ngayKhoiChieu)}</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Đánh giá</p>
                        <p className="contentInfo">{getMovieDetailData?.danhGia.toFixed(1)}</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Thời lượng</p>
                        <p className="contentInfo">120 phút</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Mã phim</p>
                        <p className="contentInfo">{getMovieDetailData?.maPhim}</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Định dạng</p>
                        <p className="contentInfo">2D/Digital</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Điểm IMDb</p>
                        <p className="contentInfo">6.4</p>
                      </div>
                    </Grid>
                    <Grid item xs={6} className="movieDetail-bottom-content-right">
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentTitle">Nội dung</p>
                      </div>
                      <div className="movieDetail-bottom-content-row">
                        <p className="contentInfo">{getMovieDetailData?.moTa}</p>
                      </div>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="movieDetail-bottom-showtime">
                    <div className="movieDetail-bottom-showtime-container">
                      <div className="movieDetail-bottom-showtime-left">
                        <ul>
                          {listTheater &&
                            listTheater.map((theaterName, index) => (
                              <li key={index}>
                                <a href="/" className={styleActive(theaterName)} onClick={(e) => handleChangeTheater(e, theaterName)}>
                                  <img src={`/img/Theater/${theaterName}.png`} alt="" />
                                  <span>{theaterName}</span>
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="movieDetail-bottom-showtime-right">
                        {listTheaterCluster.map((theaterCluster, index) => (
                          <div className="movieDetail-bottom-showtime-right-item" key={index}>
                            <div className="movieDetail-bottom-showtime-right-title">
                              <img src={`/img/Theater/${chooseTheater}.png`} alt="" />
                              <span>{theaterCluster[0].thongTinRap.tenCumRap}</span>
                            </div>
                            <div className="movieDetail-bottom-showtime-right-digital">
                              <span>2D Digital</span>
                            </div>
                            <div className="movieDetail-bottom-showtime-right-booking">
                              {theaterCluster.map((item, index) => (
                                <button className="btn-booking" key={index} onClick={(e) => handleBookingMovie(e, item.maLichChieu)}>
                                  <span className="movieDetail-bottom-showtime-right-booking-time-start">
                                    {getHoursAndMins(item.ngayChieuGioChieu)}
                                  </span>
                                  - {getHoursAndMins(item.ngayChieuGioChieu, 2)}
                                  <p className="movieDetail-bottom-showtime-right-booking-day">
                                    Ngày chiếu:
                                    {getDate(item.ngayChieuGioChieu)}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Video PopUp */}
      <VideoPopUp isPopUp={isPopUp} videoID={videoId} setPopUp={setPopUp} />
    </AppLayout>
  );
}
