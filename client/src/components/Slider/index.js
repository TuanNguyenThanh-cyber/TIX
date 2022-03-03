import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { arraySliders } from "../../FakeData";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import VideoPopUp from "../VideoPopUp";
import HomeTools from "../HomeTools";
import "./slider.scss";

export default function Slider() {
  const [isVideoPopUp, setIsVideoPopUp] = useState(false);
  const [videoID, setVideoID] = useState("");

  // Custom Carousel
  const handleItemSlide = (index, item) => {};
  const customArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button className="button-custom-control button-custom-prev" onClick={onClickHandler} title={label}>
        <NavigateBefore className="button-custom-icon" />
      </button>
    );
  const customArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button className="button-custom-control button-custom-next" onClick={onClickHandler} title={label}>
        <NavigateNext className="button-custom-icon" />
      </button>
    );

  // Handle PopUp Video
  const handlePopUpVideo = (videoID) => {
    setIsVideoPopUp(true);
    setVideoID(videoID);
  };
  return (
    <div id="slider">
      <Carousel
        emulateTouch={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        onClickItem={handleItemSlide}
        renderArrowPrev={customArrowPrev}
        renderArrowNext={customArrowNext}
      >
        {arraySliders.map((slider) => (
          <div className="slider-item" key={slider.videoID}>
            <img src={slider.srcImg} alt="" />
            <div className="backgroundLinear"></div>
            <button className="btn-play" onClick={(e) => handlePopUpVideo(slider.videoID)}>
              <img src="/img/play-video.png" alt="" />
            </button>
          </div>
        ))}
      </Carousel>
      <VideoPopUp isPopUp={isVideoPopUp} setPopUp={setIsVideoPopUp} videoID={videoID}></VideoPopUp>
      <HomeTools></HomeTools>
    </div>
  );
}
