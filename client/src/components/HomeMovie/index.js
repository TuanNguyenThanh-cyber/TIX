import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import { listsMovie } from "../../FakeData";
import ListsMovie from "../ListsMovie";
import "./homemovie.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomeMovie() {
  // Material-UI
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // Carousel
  const [isVideoPopUp, setIsVideoPopUp] = useState(false);
  const [videoID, setVideoID] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="homeMovie" className={classes.root}>
      {/* Home Moive Header */}
      <AppBar position="static" className="homeMovie-header">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          className="homeMovie-tab"
        >
          <Tab
            label="Đang chiếu"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeMovie-tab-item"
            {...a11yProps(0)}
          />
          <Tab
            label="Sắp chiếu"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeMovie-tab-item"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      {/* Home Moive Carousel */}
      <TabPanel
        value={value}
        index={0}
        children={<ListsMovie lists={listsMovie}></ListsMovie>}
      ></TabPanel>
      <TabPanel
        value={value}
        index={1}
        children={<ListsMovie lists={listsMovie}></ListsMovie>}
      ></TabPanel>
    </div>
  );
}
