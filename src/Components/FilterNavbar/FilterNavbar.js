import React, { useContext } from "react";
import Select from "react-select";
import FilterForm from "../FilterForm/FilterForm";
import FilterDate from "../FilterDate/FilterDate";
import { dataContainer } from "../FilterData/FilterData";
import "./FilterNavbar.css";
import FilterGrouping from "../FilterGrouping/FilterGrouping";

function FilterNavbar(props) {
  const {
    depos,
    choosenDepo,
    setChoosenDepo,
    showDate,
    requestFilter,
  } = useContext(dataContainer);

  function openDateFilter() {
    let form = document.getElementById("formCollapse");
    let grouping = document.getElementById("groupingCollapse");
    form.classList.remove("show");
    grouping.classList.remove("show");
  }

  function openFormFilter() {
    let date = document.getElementById("dateCollapse");
    let grouping = document.getElementById("groupingCollapse");
    date.classList.remove("show");
    grouping.classList.remove("show");
  }

  function openGroupingFilter() {
    let form = document.getElementById("formCollapse");
    let date = document.getElementById("dateCollapse");
    form.classList.remove("show");
    date.classList.remove("show");
  }

  function openDepoFilter() {
    let form = document.getElementById("formCollapse");
    let grouping = document.getElementById("groupingCollapse");
    let date = document.getElementById("dateCollapse");
    form.classList.remove("show");
    grouping.classList.remove("show");
    date.classList.remove("show");
  }

  return (
    <div>
      <div className="filter-navbar text-left p-4 shadow">
        <i className="h5 fas fa-arrow-left"></i>
        <h5 className="d-inline ml-3">Merchandise Reporting</h5>
        <div className="button-container">
          <button
            className="d-block mt-3 filter-date"
            type="button"
            data-toggle="collapse"
            id="#dateCollapse"
            data-target="#dateCollapse"
            aria-expanded="false"
            aria-controls="dateCollapse"
            onClick={openDateFilter}
          >
            <span>
              {showDate !== undefined
                ? showDate.from !== undefined
                  ? `${showDate.from} s/d ${showDate.to}`
                  : showDate
                : "Tanggal"}
            </span>
          </button>
          <span onClick={openDepoFilter}>
            <Select
              options={depos}
              value={choosenDepo}
              className="mr-2"
              onChange={(value) => setChoosenDepo(value)}
            />
          </span>
          <button
            className="filter-button mt-3 ml-4 mr-3"
            type="button"
            data-toggle="collapse"
            id="#formCollapse"
            data-target="#formCollapse"
            aria-expanded="false"
            aria-controls="formCollapse"
            onClick={openFormFilter}
          >
            <i className="fas fa-filter mr-2"></i>
            <span>Filter</span>
          </button>
          <button
            className="filter-button mt-3"
            type="button"
            data-toggle="collapse"
            id="#groupingCollapse"
            data-target="#groupingCollapse"
            aria-expanded="false"
            aria-controls="groupingCollapse"
            onClick={openGroupingFilter}
          >
            <i className="fas fa-layer-group mr-2"></i>
            <span>Grouping</span>
          </button>
          <button
            className="btn btn-primary ml-3 btn-request-filter"
            onClick={requestFilter}
          >
            Terapkan Filter
          </button>
        </div>
        <div className="color-container d-flex">
          <div>
            <div className="manager-color">Manager</div>
          </div>
          <div>
            <div className="spv-color">Supervisor</div>
          </div>
          <div>
            <div className="sales-color">Salesman</div>
          </div>
        </div>
      </div>

      <div className="collapse position-absolute" id="formCollapse">
        <FilterForm />
      </div>

      <div className="collapse position-absolute" id="dateCollapse">
        <FilterDate />
      </div>

      <div className="collapse position-absolute" id="groupingCollapse">
        <FilterGrouping />
      </div>
    </div>
  );
}

export default FilterNavbar;
