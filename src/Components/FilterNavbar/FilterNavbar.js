import React from "react";
import "./FilterNavbar.css";
import FilterForm from "../FIlterForm/FilterForm";
function FilterNavbar(props) {
  return (
    <div>
      <div className="filter-navbar text-left p-4 shadow">
        <i className="h5 fas fa-arrow-left"></i>
        <h5 className="d-inline ml-3">Merchandise Reporting</h5>
        <button
          className="filter-button d-block mt-3"
          type="button"
          data-toggle="collapse"
          data-target="#formCollapse"
          aria-expanded="false"
          aria-controls="formCollapse"
        >
          <i className="fas fa-filter mr-2"></i>
          <span>Filter</span>
        </button>
      </div>
      <div class="collapse position-absolute" id="formCollapse">
        <FilterForm />
      </div>
    </div>
  );
}

export default FilterNavbar;
