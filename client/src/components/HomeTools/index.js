import React, { useState } from "react";
import {
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
  MenuItem,
} from "@material-ui/core";
import "./hometools.scss";

export default function HomeTools() {
  const [movie, setMovie] = useState("");
  const [theater, setTheater] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const handleChange = (e, type) => {
    switch (type) {
      case "movie":
        setMovie(e.target.value);
        break;
      case "theater":
        setTheater(e.target.value);
        break;
      case "day":
        setDay(e.target.value);
        break;
      case "time":
        setTime(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div id="homeTools">
      {/* Movie */}
      <FormControl variant="outlined" className="homeTools-movie">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-movie">
          Phim
        </InputLabel>
        <Select
          native
          value={movie}
          onChange={(e) => handleChange(e, "movie")}
          label="Movie"
          inputProps={{
            name: "movie",
            id: "homeTools-input-movie",
          }}
        >
          <option>-- Vui lòng chọn phim --</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      {/* Theater */}
      <FormControl variant="outlined" className="homeTools-theater">
        <InputLabel
          className="homeTools-label"
          htmlFor="homeTools-input-theater"
        >
          Rạp
        </InputLabel>
        <Select
          native
          value={theater}
          onChange={(e) => handleChange(e, "theater")}
          label="Theater"
          inputProps={{
            name: "theater",
            id: "homeTools-input-theater",
          }}
        >
          <option>-- Vui lòng chọn rạp --</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      {/* Day */}
      <FormControl variant="outlined" className="homeTools-day">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-day">
          Ngày
        </InputLabel>
        <Select
          native
          value={day}
          onChange={(e) => handleChange(e, "day")}
          label="Day"
          inputProps={{
            name: "day",
            id: "homeTools-input-day",
          }}
        >
          <option>-- Vui lòng chọn ngày --</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      {/* Time */}
      <FormControl variant="outlined" className="homeTools-time">
        <InputLabel className="homeTools-label" htmlFor="homeTools-input-time">
          Giờ
        </InputLabel>
        <Select
          native
          value={time}
          onChange={(e) => handleChange(e, "time")}
          label="Time"
          inputProps={{
            name: "time",
            id: "homeTools-input-time",
          }}
        >
          <option>-- Vui lòng chọn giờ --</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>

      {/* Button */}
      <div className="homeTools-btn">
        <button className="">Mua vé ngay</button>
      </div>
    </div>
  );
}
