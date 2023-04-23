import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Department.toUpperCase().includes(searchWord.toUpperCase())
      || value.Number.includes(searchWord)
      || value.Tags === searchWord.toUpperCase()
      || value.Department.toUpperCase() + " " + value.Number === (searchWord.toUpperCase())
      || value.Department.toUpperCase()+value.Number === (searchWord.toUpperCase())
    });

    if(searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}></input>
        <div className="searchIcon">
        {filteredData.length === 0 ? <FontAwesomeIcon icon={faSearch} /> : <FontAwesomeIcon icon={faClose} id="clearBtn" onClick={clearInput}/>}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <div key={key}>
                <Link
                  className="dataItem"
                  to={`/department/${value.Department}/${value.Number}/reviews`}
                >
                  <p>{value["Department"].toUpperCase() + " " + value["Number"]}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
