import "./scss/main.scss";
import Header from "./components/Header";
import Slider from "./components/Slider";
import HomeMovie from "./components/HomeMovie";
import HomeBackGroundBlur from "./components/HomeBackGroundBlur";
import VerticalTabsMovie from "./components/VerticalTabsMovie";

function App() {
  return (
    <>
      <Header></Header>
      <Slider></Slider>
      <HomeMovie></HomeMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
      <VerticalTabsMovie></VerticalTabsMovie>
      <HomeBackGroundBlur></HomeBackGroundBlur>
    </>
  );
}

export default App;
