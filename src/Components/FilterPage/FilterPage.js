import React from "react";
import FilterNavbar from "../FilterNavbar/FilterNavbar";
import "./FilterPage.css";
function FilterPage(props) {
  return (
    <div>
      <FilterNavbar />
      <div className="page-body ml-5">
        <div className="option mt-5 text-left">
          <button className="bg-light d-inline mr-1 option-item">Toko</button>
          <button className="bg-light d-inline mr-1 option-item">Team</button>
          <button className="bg-light d-inline mr-1 option-item">Supplier</button>
          <button className="bg-light d-inline mr-1 option-item">Product</button>
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
