import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Star, StarHalf } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import arrayConversion from "../../utils/arrayConversion";
import getVideoIdYoutube from "../../utils/getVideoIdYoutube";
import VideoPopUp from "../VideoPopUp";
import "./cardmovie.scss";

export default function CardMovie() {
  const { getMovieListData } = useSelector((state) => state.getMovieList);
  const history = useHistory();

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
  const handlePopUpVideo = (e, trailer) => {
    e.preventDefault();
    setIsVideoPopUp(true);
    setVideoID(getVideoIdYoutube(trailer));
  };

  return (
    <div className="cardMovie">
      <Carousel
        emulateTouch={true}
        autoPlay={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        onClickItem={handleItemSlide}
        renderArrowPrev={customArrowPrev}
        renderArrowNext={customArrowNext}
      >
        {getMovieListData &&
          arrayConversion(getMovieListData, 8).map((list, index) => (
            <Grid container key={index} spacing={3} className="cardMovie-item">
              {list.map((movie, index) => (
                <Grid item xs={3} key={index}>
                  <div className="cardMovie-movie">
                    <Link
                      className="cardMovie-movie-content"
                      to={`/movie/${movie.maPhim}`}
                    >
                      <img
                        src={movie.hinhAnh}
                        alt=""
                        className="cardMovie-movie-img"
                      />
                      <div className="backgroundLinear"></div>
                      <button
                        className="btn-play"
                        onClick={(e) => handlePopUpVideo(e, movie.trailer)}
                      >
                        <img src="/img/play-video.png" alt="" />
                      </button>
                      <div className="cardMovie-rating">
                        <p className="cardMovie-rating-text">{movie.danhGia}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {[...Array(Math.floor(movie.danhGia / 2))].map(
                            (star, index) => {
                              return (
                                <Star
                                  className="cardMovie-rating-star"
                                  key={index}
                                ></Star>
                              );
                            }
                          )}
                          {movie.danhGia % 2 !== 0 && (
                            <StarHalf className="cardMovie-rating-star"></StarHalf>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="cardMovie-movie-info">
                      <div className="cardMovie-movie-title">
                        <p className="cardMovie-movie-age">P</p>
                        <p className="cardMovie-movie-name">{movie.tenPhim}</p>
                      </div>
                      <div className="cardMovie-movie-time">
                        <p>120 phút</p>
                      </div>
                      <div className="btn-red-buyticket">
                        <button className="btn-buy-ticket">Mua vé</button>
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
