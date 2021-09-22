import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { arrayLogo, arrayTheaterCluster } from "../../FakeData";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import "./verticaltabsmovie.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 940,
    maxWidth: 940,
    margin: "auto",
    border: `1px solid rgba(0, 0, 0, 0.12)`,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    padding: 10,
  },
}));

export default function VerticalTabsMovie() {
  const classes = useStyles();
  const [theaterIndex, setTheaterIndex] = useState(0);
  const [theaterClusterIndex, setTheaterClusterIndex] = useState(0);

  console.log({ theaterIndex, theaterClusterIndex });

  useEffect(() => {
    setTheaterClusterIndex(0);
  }, [theaterIndex]);

  const handleChangeTheater = (event, newValue) => {
    setTheaterIndex(newValue);
  };

  const handleChangeTheaterCluster = (event, newValue) => {
    setTheaterClusterIndex(newValue);
  };

  return (
    <div className={classes.root}>
      {/* Tab 1 */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={theaterIndex}
        scrollButtons="off"
        onChange={handleChangeTheater}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {arrayLogo.map((logo, index) => (
          <Tab
            key={index}
            label={
              <div className="theater-icon">
                <img src={logo.img} alt="" />
              </div>
            }
            className={classes.tab}
            {...a11yProps(theaterIndex)}
          />
        ))}
      </Tabs>

      {/* Tab 2 */}
      {arrayLogo.map((logo, index) => (
        <TabPanel value={theaterIndex} index={index} key={index}>
          <div
            className={classes.root}
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={theaterClusterIndex}
              scrollButtons="off"
              onChange={handleChangeTheaterCluster}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              key={index}
            >
              {arrayTheaterCluster.map((theaterCluster, index) => (
                <Tab
                  key={index}
                  label={
                    <div className="theaterCluster-content">
                      <img src={theaterCluster.img} alt="" />

                      <div className="theaterCluster-info">
                        <span className="theaterCluster-name">
                          BHD Star - Bitexco
                        </span>
                        <span className="theaterCluster-address">
                          L3-Bitexco Icon 68, 2 Hải Triều, Q.1
                        </span>
                        <a href="" className="theaterCluster-detail">
                          [chi tiết]
                        </a>
                      </div>
                    </div>
                  }
                  className={classes.tab}
                  {...a11yProps(theaterIndex)}
                />
              ))}
            </Tabs>
          </div>
        </TabPanel>
      ))}

      {/* Tab 3 */}
    </div>
  );
}
