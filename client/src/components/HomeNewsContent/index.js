import React from "react";
import { Grid } from "@material-ui/core";
import {
  ThumbUpAltOutlined,
  ChatBubbleOutlineOutlined,
} from "@material-ui/icons";
import "./homenewscontent.scss";

export default function HomeNewsContent(props) {
  const { dataNews } = props;
  return (
    <div className="homeNews">
      <Grid container spacing={3}>
        {dataNews[0].map((item, index) => (
          <Grid item xs={6} className="homeNews-item" key={index}>
            <a href="/" className="homeNews-content-img">
              <img src={item.img} alt="" />
            </a>
            <div className="homeNews-content">
              <a href="/" className="homeNews-content-title">
                {item.title}
              </a>
              <p className="homeNews-content-description">{item.description}</p>
            </div>
            <div className="homeNews-interact">
              <div className="wrapIcon">
                <ThumbUpAltOutlined className="howNews-icon-like"></ThumbUpAltOutlined>
                <span className="homeNews-amount-like">0</span>
              </div>
              <div className="wrapIcon">
                <ChatBubbleOutlineOutlined className="howNews-icon-comment"></ChatBubbleOutlineOutlined>
                <span className="homeNews-amount-comment">0</span>
              </div>
            </div>
          </Grid>
        ))}

        {dataNews[1].map((item, index) => (
          <Grid item xs={4} className="homeNews-item" key={index}>
            <a href="" className="homeNews-content-img">
              <img src={item.img} alt="" />
            </a>
            <div className="homeNews-content">
              <a href="/" className="homeNews-content-title">
                {item.title}
              </a>
              <p className="homeNews-content-description">{item.description}</p>
            </div>
            <div className="homeNews-interact">
              <div className="wrapIcon">
                <ThumbUpAltOutlined className="howNews-icon-like"></ThumbUpAltOutlined>
                <span className="homeNews-amount-like">0</span>
              </div>
              <div className="wrapIcon">
                <ChatBubbleOutlineOutlined className="howNews-icon-comment"></ChatBubbleOutlineOutlined>
                <span className="homeNews-amount-comment">0</span>
              </div>
            </div>
          </Grid>
        ))}

        <Grid item xs={4} className="homeNews-lastItem">
          {dataNews[2].map((item, index) => (
            <div className="homeNews-lastItem-content" key={index}>
              <img src={item.img} alt="" className="homeNews-lastItem-img" />
              <a href="/" className="homeNews-lastItem-title">
                <p>{item.title}</p>
              </a>
            </div>
          ))}
        </Grid>
      </Grid>

      <div className="buttonReadMore">
        <button className="btn-read-more">Xem thêm</button>
      </div>
    </div>
  );
}
