import React, { useState } from "react";
// import { Input, Button } from "antd";
import "../../Styles/SearchBar.css";
import { useDispatch } from "react-redux";
import { getText } from "../Redux/Slice/questionSlice";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const inputStyle = {
    backgroundColor: "#E6E6F5",
    marginRight: "23px",
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(getText(searchText));
    console.log("Search Text:", searchText);
  };

  return (
   <div className="search-container p-3 rounded-3">
     <div className="row">
      <div className="col">
        <input
          class="form-control"
          type="text"
          aria-label="default input example"
          placeholder="Search..."
          style={inputStyle}
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-auto">
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
   </div>
  );
};

export default SearchBar;