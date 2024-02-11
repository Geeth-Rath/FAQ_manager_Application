import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import "../../Styles/Container.css";
import Header from "../Header/Header";

const Container = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="content-wrapper">
          <SearchBar />
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Container;
