import React from "react";
import { Link } from "react-router-dom";
function Home(props) {
  return (
    <div>
      <Link to='/merchandise/report'>
        <button className="btn btn-primary mr-3 mt-5">MERCHANDISE REPORT</button>
      </Link>
      <Link to='/merchandise/rekap'>
        <button className="btn btn-primary mt-5">MERCHANDISE REPORT REKAP</button>
      </Link>
    </div>
  );
}

export default Home;
