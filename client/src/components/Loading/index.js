import React from "react";
import ReactLoading from "react-loading";
import "./loading.scss";

export default function Loading() {
  return (
    <div className="loading-app">
      <ReactLoading
        type="spinningBubbles"
        color="#fa5238"
        width="100px"
        height="100px"
        delay={0}
      />
    </div>
  );
}
