import React from "react";
import ModalVideo from "react-modal-video";

export default function VideoPopUp(props) {
  // Props VideoPopUp has : isPopUp, setPopUp, videoID
  return (
    <React.Fragment>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={props.isPopUp}
        videoId={props.videoID}
        onClose={() => props.setPopUp(false)}
      />
    </React.Fragment>
  );
}
