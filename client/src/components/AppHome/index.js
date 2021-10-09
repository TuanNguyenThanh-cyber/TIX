import React from "react";
import { Grid } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { arrayCarouselMobile } from "../../FakeData";
import "./apphome.scss";

export default function AppHome() {
  return (
    <div id="appHome">
      <Grid container className="appHome-container">
        <Grid item xs={6} className="appHome-left">
          <div>
            <p className="appHome-left-title">Ứng dụng tiện lợi dành cho</p>
            <p className="appHome-left-title">người yêu điện ảnh</p>
            <br />
            <p className="appHome-left-text">
              Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
              đổi quà hấp dẫn.
            </p>
            <br />
            <button className="btn-app">App miễn phí - Tải về ngay!</button>
            <p className="appHome-left-text-under">
              TIX có hai phiên bản
              <a href="/"> iOS </a>&<a href="/"> Android</a>
            </p>
          </div>
        </Grid>
        <Grid item xs={6} className="appHome-right">
          <img
            src="/img/Mobile/mobile.png"
            alt=""
            className="appHome-right-phone-img"
          />
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            emulateTouch={true}
            className="appHome-right-carousel"
          >
            {arrayCarouselMobile.map((item, index) => (
              <div className="appHome-right-carousel-item" key={index}>
                <img
                  src={item.img}
                  className="appHome-right-carousel-item-img"
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </div>
  );
}
