import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import VideoPopUp from "../VideoPopUp";
import "./slider.scss";

// ArraySliders
const arraySliders = [
  {
    srcImg: "/img/ban-tay-diet-quy-demon-hunter-c16-16165641754017.png",
    videoID: "uqJ9u7GSaYM",
  },
  {
    srcImg: "/img/trang-ti-16190592773054.jpg",
    videoID: "VTnGOjtaWAY",
  },
  {
    srcImg: "/img/lat-mat-48h-16176186348562.jpg",
    videoID: "kBY2k3G6LsM",
  },
  {
    srcImg:
      "/img/detective-conan-scarlet-bullet-tham-tu-lung-danh-conan-vien-dan-do-c13-16188002680135.jpg",
    videoID: "HSow7Ep6l_4",
  },
  {
    srcImg: "/img/thien-than-ho-menh-16157904502407.jpg",
    videoID: "1H-2FeFOM08",
  },
  {
    srcImg: "/img/nguoi-nhan-ban-seobok-c18-16173645196710.jpg",
    videoID: "JNZv1SgHv68",
  },
];

export default function Slider() {
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
    <div>
      <Carousel
        emulateTouch={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        dynamicHeight={false}
        onClickItem={handleItemSlide}
        renderArrowPrev={customArrowPrev}
        renderArrowNext={customArrowNext}
        className="slide"
      >
        {arraySliders.map((slider) => (
          <div className="slide-item" key={slider.videoID}>
            <img src={slider.srcImg} alt="" />
            <div className="backgroundLinear"></div>
            <button
              className="btn-play"
              onClick={() => handlePopUpVideo(slider.videoID)}
            >
              <img src="/img/play-video.png" alt="" />
            </button>
          </div>
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
