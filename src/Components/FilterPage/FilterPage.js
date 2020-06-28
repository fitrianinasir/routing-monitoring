import React, { useContext } from "react";
import FilterNavbar from "../FilterNavbar/FilterNavbar";
import { dataContainer } from "../FilterData/FilterData";
import DotLoader from "react-spinners/DotLoader";

function FilterPage(props) {
  const { loading } = useContext(dataContainer);
  return (
    <div>
      <FilterNavbar />
      <div className="page-body ml-5">
        <div className="option mt-5 text-left">
          <button className="bg-light d-inline mr-1 option-item">Toko</button>
          <button className="bg-light d-inline mr-1 option-item">Team</button>
          <button className="bg-light d-inline mr-1 option-item">
            Supplier
          </button>
          <button className="bg-light d-inline mr-1 option-item">
            Product
          </button>
        </div>
      </div>
      <div className={loading ? "sweet-loading" : ""}>
        <DotLoader size={80} color={"#fff"} loading={loading} />
      </div>
    </div>
  );
}

export default FilterPage;
