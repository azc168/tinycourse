import React from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
export default function ClassPage() {
  const { department, courseNum } = useParams();
  console.log(useParams());

  return (
    <div>
      <Reviews courseDep={department} courseNum={courseNum} />
    </div>
  );
}
