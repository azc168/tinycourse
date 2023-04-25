import React from "react";
import "./trendCard.css";

export default function TrendCard({ title, descs }) {
  return (
    <div className="trendCard">
      <header>{title}</header>
      <br />
        <div>
          {descs}
        </div>
    </div>
  );
}
