import { useNavigate } from "react-router-dom";
import React from "react";

import Jumbotron from "../components/Jumbotron";
import Masonry from "../components/Masonry";

const Home = () => {
  return (
    <div>
      <div className="ms_wrapper h-full">
        <Jumbotron />
        <Masonry />
      </div>
    </div>
  );
};

export default Home;
