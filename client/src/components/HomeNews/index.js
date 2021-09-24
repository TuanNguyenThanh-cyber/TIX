import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import { arrayNewsTab1, arrayNewsTab2, arrayNewsTab3 } from "../../FakeData";
import HomeNewsContent from "../HomeNewsContent";
import "./homenews.scss";

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

export default function HomeNews() {
  // Material-UI
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="homeNews" className={classes.root}>
      {/* Home News Header */}
      <AppBar position="static" className="homeNews-header">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          aria-label="simple tabs example"
          className="homeNews-tab"
        >
          <Tab
            label="Điện ảnh 24h"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeNews-tab-item"
            {...a11yProps(0)}
          />
          <Tab
            label="Review"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeNews-tab-item"
            {...a11yProps(1)}
          />
          <Tab
            label="Khuyến mãi"
            disableRipple={true}
            disableFocusRipple={true}
            className="homeNews-tab-item"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      {/* Home New Content */}
      <TabPanel value={value} index={0}>
        {<HomeNewsContent dataNews={arrayNewsTab1}></HomeNewsContent>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {<HomeNewsContent dataNews={arrayNewsTab2}></HomeNewsContent>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {<HomeNewsContent dataNews={arrayNewsTab3}></HomeNewsContent>}
      </TabPanel>
    </div>
  );
}
