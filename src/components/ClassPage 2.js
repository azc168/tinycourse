import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Reviews from "./Reviews";
export default function ClassPage() {
    const location = useLocation();
    const {courseDep, courseNum} = location.state;

  return (
    <div>
        <Reviews courseDep={courseDep} courseNum={courseNum}/>
    </div>
  );
}
