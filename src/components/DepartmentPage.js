import React from "react";
import { Link, useParams } from "react-router-dom";
import { courseArrays } from "./DataArrays";

export default function DepartmentPage() {
  const { department } = useParams();
  const departmentCourses = courseArrays[department + "Courses"];

  return (
    <div>
      <h1>{department}</h1>

      {/* Check if departmentCourses is defined before mapping */}
      {departmentCourses && departmentCourses.map((departmentCourse, index) => (
        <Link key={index} to={`/department/${department}/${departmentCourse}`}>
          {departmentCourse}
        </Link>
      ))}

      {/* Add any additional content or components here */}
    </div>
  );
}
