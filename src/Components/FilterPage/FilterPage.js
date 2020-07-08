import React, { useContext } from "react";
import FilterNavbar from "../FilterNavbar/FilterNavbar";
import { dataContainer } from "../FilterData/FilterData";
import DotLoader from "react-spinners/DotLoader";
import FilterTable from "../FilterTable/FilterTable";

function FilterPage(props) {
  const { loading, tableData } = useContext(dataContainer);
  return (
    <div>
      <FilterNavbar />
      <div className="page-body ml-5">
        <FilterTable tableData={tableData} />
      </div>
      <div className={loading ? "sweet-loading" : ""}>
        <DotLoader size={80} color={"#fff"} loading={loading} />
      </div>
    </div>
  );
}

export default FilterPage;
