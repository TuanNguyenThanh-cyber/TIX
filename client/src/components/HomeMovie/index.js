import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Slide,
  Grid,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { Carousel } from "react-responsive-carousel";
import { listMovies } from "../../FakeData";
import VideoPopUp from "../VideoPopUp";
import "./homemovie.scss";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomeMovie() {
  // Material-UI
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // Carousel
  const [isVideoPopUp, setIsVideoPopUp] = useState(false);
  const [videoID, setVideoID] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Custom Carousel
  const handleItemSlide = (index, item) => {};
  const customArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        className="button-custom-control button-custom-prev"
        onClick={onClickHandler}
        title={label}
      ></button>
    );
  const customArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        className="button-custom-control button-custom-next"
        onClick={onClickHandler}
        title={label}
      ></button>
    );

  // Handle PopUp Video
  const handlePopUpVideo = (videoID) => {
    setIsVideoPopUp(true);
    setVideoID(videoID);
  };

  // Function Render Carousel Movie
  const renderCarousel = () => {
    return (
      <div className="homeMovie-slider">
        <Carousel
          emulateTouch={true}
          autoPlay={false}
          infiniteLoop={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          onClickItem={handleItemSlide}
          renderArrowPrev={customArrowPrev}
          renderArrowNext={customArrowNext}
        >
          {listMovies.map((list, index) => (
            <Grid container spacing={3} className="homeSlider-item">
              {list.map((movie) => (
                <Grid item xs={3} key={movie.videoID}>
                  <div className="homeSlider-movie">
                    <div className="homeSlider-movie-content">
                      <img
                        src={movie.srcImg}
                        alt=""
                        className="homeSlider-movie-img"
                      />
                      <div className="backgroundLinear"></div>
                      <button
                        className="btn-play"
                        onClick={() => handlePopUpVideo(movie.videoID)}
                      >
                        <img src="/img/play-video.png" alt="" />
                      </button>
                      <div className="homeSlider-rating">
                        <p className="homeSlider-rating-text">10</p>
                        <p style={{ display: "flex" }}>
                          <Star className="homeSlider-rating-star"></Star>
                          <Star className="homeSlider-rating-star"></Star>
                          <Star className="homeSlider-rating-star"></Star>
                          <Star className="homeSlider-rating-star"></Star>
                          <Star className="homeSlider-rating-star"></Star>
                        </p>
                      </div>
                    </div>

                    <div className="homeSlider-movie-info">
                      <div className="homeSlider-movie-title">
                        <p className="homeSlider-movie-age">P</p>
                        <p className="homeSlider-movie-name">
                          Bàn Tay Diệt Quỷ - Evil Expeller (C16)
                        </p>
                      </div>
                      <p className="homeSlider-movie-time">120 phút</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          ))}
        </Carousel>
        <VideoPopUp
          isPopUp={isVideoPopUp}
          setPopUp={setIsVideoPopUp}
          videoID={videoID}
        ></VideoPopUp>
      </div>
    );
  };

  console.log(listMovies[0]);
  return (
    <div id="homeMovie" className={classes.root}>
      {/* Home Moive Header */}
      <AppBar position="static" className="homeMovie-header">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className="homeMovie-tab"
        >
          <Tab
            label="Đang chiếu"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeMovie-tab-item"
            {...a11yProps(0)}
          />
          <Tab
            label="Sắp chiếu"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeMovie-tab-item"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      {/* Home Moive Carousel */}
      <TabPanel value={value} index={0} children={renderCarousel()}></TabPanel>
      <TabPanel value={value} index={1} children={renderCarousel()}></TabPanel>
    </div>
  );
}
