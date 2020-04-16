import React from "react";
import "./menu-item.styles.scss";

const MenuItem = (props) => (
  <div
    className={`${props.size} menu-item`}
    style={{ backgroundImage: `url(${props.imageUrl}` }}
  >
    <div className="content">
      <h1 className="title">{props.title.toUpperCase()}</h1>
      <a href={props.linkUrl} className="subtitle">
        SHOP NOW
      </a>
    </div>
  </div>
);

export default MenuItem;
