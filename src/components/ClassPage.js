import React from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import "./classPage.css"
export default function ClassPage() {
  const { department, courseNum } = useParams();
  //console.log(useParams());

  return (
    <div className="class-container">
      <h2 className="heading">{department} {courseNum} Reviews</h2>
      <Reviews courseDep={department} courseNum={courseNum} />
    </div>
  );
}
