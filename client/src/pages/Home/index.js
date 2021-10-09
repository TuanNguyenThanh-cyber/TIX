// Lib, others
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList } from "../../redux/actions/movie";

// Components
import AppLayout from "../../layouts/AppLayout";
import Slider from "../../components/Slider";
import HomeMovie from "../../components/HomeMovie";
import HomeBackGroundBlur from "../../components/HomeBackGroundBlur";
import HomeBookingMovie from "../../components/HomeBookingMovie";
import HomeNews from "../../components/HomeNews";
import AppHome from "../../components/AppHome";
import BackToTop from "../../components/BackToTop";

export default function Home() {
  const dispatch = useDispatch();
  const { gp } = useSelector((state) => state.changeGp);

  useEffect(() => {
    dispatch(getMovieList(gp));
  }, [gp, dispatch]);

  return (
    <AppLayout>
      <BackToTop showBelow={250} />
      <Slider />
      <HomeMovie />
      <HomeBackGroundBlur />
      <HomeBookingMovie />
      <HomeBackGroundBlur />
      <HomeNews />
      <AppHome />
    </AppLayout>
  );
}
