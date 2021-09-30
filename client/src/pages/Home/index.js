import React from "react";
import AppLayout from "../../layouts/AppLayout";
import Slider from "../../components/Slider";
import HomeMovie from "../../components/HomeMovie";
import HomeBackGroundBlur from "../../components/HomeBackGroundBlur";
import VerticalTabMovie from "../../components/VerticalTabMovie";
import HomeNews from "../../components/HomeNews";
import AppHome from "../../components/AppHome";
import BackToTop from "../../components/BackToTop";

export default function Home() {
  return (
    <AppLayout>
      <BackToTop showBelow={250}></BackToTop>
      <Slider></Slider>
      <HomeMovie></HomeMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
      <VerticalTabMovie></VerticalTabMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
      <HomeNews></HomeNews>
      <AppHome></AppHome>
    </AppLayout>
  );
}
