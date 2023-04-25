import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link, useParams } from "react-router-dom";
import classData from "./classData.json";
import "./departmentPage.css";
// import { getDocs, collection, query, where } from "firebase/firestore";

export default function DepartmentPage() {
  const [sortValue, setSortValue] = useState("");
  const [genValue, setGenValue] = useState("Any");
  const params = useParams();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  /*const { courseDep, courseNum, rating, workload } = {
    courseDep: params.department.toUpperCase(),
    courseNum: params.courseNum,
    rating: params.rating,
    workload: params.workload,
  };*/

  
  let departmentCourses = [];
  switch (params.department) {
    case "COMP":
      departmentCourses = classData.Comp;
      break;
    case "BIOL":
      departmentCourses = classData.Biol;
      break;
    case "ECON":
      departmentCourses = classData.Econ;
      break;
    default:
      break;
  };

  
  useEffect(() => {

    console.log(sortValue);
    if (sortValue === "high-low-course-num") {
      departmentCourses.sort(function(a, b){return b.Number - a.Number});
    } else if (sortValue === "low-high-course-num") {
      departmentCourses.sort(function(a, b){return a.Number - b.Number});
    }

    forceUpdate();

    console.log(genValue);
    //console.log(departmentCourses.filter((course) => {return course.Tags === 'PX';}));
    //departmentCourses.filter((course) => course.Tags === 'PX');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, genValue]);
  

  // if i filter the department courses, then when i map them they will already be in order


  return (
    <div className="page-body">
      <div className="sort-bar">
        <label>
            {" "}
            Sort: {" "}
        </label>
        <select name="sortOptions" onChange={(event) => {setSortValue(event.target.value)}} value={sortValue} id="high-low">
          <option value="low-high-course-num">Low-high course number</option>
          <option value="high-low-course-num">High-low course number</option>
          <option value="high-low-rating">High-low rating</option>
          <option value="low-high-rating">Low-high rating</option>
          <option value="high-low-workload">High-low workload</option>
          <option value="low-high-workload">Low-high workload</option>
        </select>
        <label id="genId">
            {" "}
            Filter by Gen Ed: {" "}
        </label>
        <select name="genedOptions" onChange={(event) => {setGenValue(event.target.value)}} value={genValue} id="gen-ed">
          <option value="Any">Any</option>
          <option value="CI">CI</option>
          <option value="EE">EE</option>
          <option value="PL">PL</option>
          <option value="PX">PX</option>
          <option value="QR">QR</option>
        </select>
        <button className="filter-search">Find me classes!</button>
      </div>
      <div className="class-card-container">
        {departmentCourses.length > 0 ? (
          departmentCourses.map((course, index) => (
            <div key={index} className="class-card">
              <div className="class-header">
                <div className="class-department">
                  {params.department} {course.Number}
                </div>
              </div>
              <div className="class-name">{course.Name}</div>
              <div className="class-rating"> Rating:</div>
              <div className="class-workload"> Workload:</div>
              <div className="class-difficulty"> Difficulty:</div>
              <div>
                {Array.isArray(course.Tags) && course.Tags.length > 0 && (
                  <div>
                    {course.Tags.map((tag) => (
                      <div key={tag} className="class-gen-ed">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                {typeof course.Tags === "string" && course.Tags !== "N/A" && (
                  <div className="class-gen-ed">{course.Tags}</div>
                )}
              </div>
              <div className="class-review-link">
                <Link to={`/department/${params.department}/${course.Number}/reviews`} state={{courseDep:params.department,courseNum:course.Number}}>
                  <u>Read more reviews</u>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No classes uploaded yet. Please check back at a later time.</div>
        )}
      </div>
    </div>
  );
}
