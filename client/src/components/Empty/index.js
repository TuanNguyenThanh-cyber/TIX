import React from "react";
import { Link } from "react-router-dom";
import "./empty.scss";

export default function Empty(props) {
  return (
    <div className="empty">
      <img src="/img/empty.png" alt className="empty__img" />
      <p className="empty__note">{props.children}</p>
      <Link to="/" className="empty__btn">
        Quay trở về trang chủ
      </Link>
    </div>
  );
}
