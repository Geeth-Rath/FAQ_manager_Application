import React, { useState } from "react";
import { Input, Button } from "antd";
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
    <div className="search-container">
      <Input
        className="search-input"
        placeholder="Search..."
        style={inputStyle}
        value={searchText}
        onChange={handleInputChange}
      />
      <Button
        className="search-button"
        type="primary"
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
