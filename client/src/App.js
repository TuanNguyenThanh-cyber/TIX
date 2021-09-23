import "./scss/main.scss";
import Header from "./components/Header";
import Slider from "./components/Slider";
import HomeMovie from "./components/HomeMovie";
import HomeBackGroundBlur from "./components/HomeBackGroundBlur";
import VerticalTabMovie from "./components/VerticalTabMovie";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <Slider></Slider>
      <HomeMovie></HomeMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
      <VerticalTabMovie></VerticalTabMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
      <Footer></Footer>
    </>
  );
}

export default App;
