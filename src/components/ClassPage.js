import React from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import "./classPage.css";
import { Link } from "react-router-dom";
export default function ClassPage() {
  const { department, courseNum } = useParams();
  //console.log(useParams());

  return (
    <div className="class-container">
      <h2 className="heading">
        {department} {courseNum} Reviews
      </h2>
      <Link className="back-btn" to={`/department/${department}`}>
        <u id="backToCourses">Back to All {department} Courses</u>
      </Link>
      <Reviews courseDep={department} courseNum={courseNum} />
    </div>
  );
}
