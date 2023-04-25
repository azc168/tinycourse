import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link, useParams } from "react-router-dom";
import classData from "./classData.json";
import "./departmentPage.css";

export default function DepartmentPage() {
  const [sortValue, setSortValue] = useState("");
  const [genValue, setGenValue] = useState("Any");
  const { department } = useParams();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let departmentCourses = [];
  switch (department) {
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
    } else if (sortValue === "high-low-rating") {
      departmentCourses.sort(function(a, b){return a.avgRating - b.avgRating});
      console.log();
    } else if (sortValue === "low-high-rating") {
    }

    forceUpdate();

    //console.log(genValue);
    //console.log(departmentCourses.filter((course) => {return course.Tags === 'PX';}));
    //departmentCourses.filter((course) => course.Tags === 'PX');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, genValue]);
  

  // if i filter the department courses, then when i map them they will already be in order

  const [avgRating, setAvgRating] = useState([]);
  const [avgDifficulty, setAvgDifficulty] = useState([]);
  const [avgWorkload, setAvgWorkload] = useState([]);


  const getAverages = async (department, courseNum) => {
    const courseRef = collection(db, "reviews");
    const courseQuery = query(
      courseRef,
      where("department", "==", department),
      where("course", "==", courseNum)
    );
    const courseSnapshot = await getDocs(courseQuery);
    let totalRating = 0;
    let totalDifficulty = 0;
    let totalWorkload = 0;
    courseSnapshot.forEach((doc) => {
      totalRating += Number(doc.data().rate);
      totalDifficulty += Number(doc.data().difficulty);
      totalWorkload += Number(doc.data().workload);
    });
    const numDocs = courseSnapshot.size;
    const averageRating = numDocs > 0 ? totalRating / numDocs : null;
    const averageDifficulty = numDocs > 0 ? totalDifficulty / numDocs : null;
    const averageWorkload = numDocs > 0 ? totalWorkload / numDocs : null;
    //console.log("total rating:",totalRating, "total difficult", totalDifficulty);
    return [averageRating, averageDifficulty, averageWorkload];
  };

  useEffect(() => {
    if (departmentCourses.length > 0) {
      Promise.all(
        departmentCourses.map((course) => getAverages(department, course.Number))
      ).then((averages) => {
        setAvgRating(
          averages.map((avg) => {
            return avg[0];
          })
        );
        setAvgDifficulty(
          averages.map((avg) => {
            return avg[1];
          })
        );
        setAvgWorkload(
          averages.map((avg) => {
            return avg[2];
          })
        );
      });
    }
    
    
  }, [department,departmentCourses]);

  const filterSearch = () => {};

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
        <button className="filter-search" onClick={filterSearch}>
          Find me classes!
        </button>
      </div>
      <div className="class-card-container">
        {departmentCourses.length > 0 ? (
          departmentCourses.map((course, index) => (
            <div key={index} className="class-card">
              <div className="class-header">
                <div className="class-department">
                  {department} {course.Number}
                </div>
              </div>
              <div className="class-name">{course.Name}</div>
              <div className="class-rating"> Rating: {avgRating[index]} / 5</div>
              <div className="class-workload"> Workload: {avgWorkload[index]} / 5</div>
              <div className="class-difficulty"> Difficulty: {avgDifficulty[index]} / 5</div>
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
                  <div className="class-gen-ed">
                  <p>{course.Tags}</p></div>
                )}
              </div>
              <div className="class-review-link">
                <Link to={`/department/${department}/${course.Number}/reviews`}>
                  <u>Read reviews</u>
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
