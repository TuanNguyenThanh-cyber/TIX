import React, { useState } from "react";
import { Star } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import VideoPopUp from "../VideoPopUp";
import "./listsmovie.scss";

export default function ListsMovie(props) {
  const { lists } = props;

  // Carousel
  const [isVideoPopUp, setIsVideoPopUp] = useState(false);
  const [videoID, setVideoID] = useState("");

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

  return (
    <div className="homeSlider">
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
        {lists.map((list, index) => (
          <Grid container key={index} spacing={3} className="homeSlider-item">
            {list.map((movie, index) => (
              <Grid item xs={3} key={index}>
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
                    <div className="homeSlider-movie-time">
                      <p>120 phút</p>
                    </div>
                    <div className="btn-red-buyticket">
                      <button className="btn-red">Mua vé</button>
                    </div>
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
}
