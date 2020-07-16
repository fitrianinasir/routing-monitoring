import React, { useContext } from "react";
import FilterNavbar from "../FilterNavbar/FilterNavbar";
import { dataContainer } from "../FilterData/FilterData";
import DotLoader from "react-spinners/DotLoader";
import FilterTable from "../FilterTable/FilterTable";

function FilterPage(props) {
  const {
    loading,
    tableData,
    tableDataRekap,
    isFilterClicked,
    isFilterRekapClicked,
  } = useContext(dataContainer);
  return (
    <div>
      <FilterNavbar />
      <div className="page-body ml-5">
        {isFilterClicked || isFilterRekapClicked ? (
          isFilterClicked ? (
            Object.keys(tableData).length === 0 ? (
              <h2 className="text-secondary mt-5">
                Tidak ada data pada pilihan filter
              </h2>
            ) : (
              <FilterTable keyData='report' tableData={tableData} />
            )
          ) : isFilterRekapClicked ? (
            Object.keys(tableData).length === 0 ? (
              <h2 className="text-secondary mt-5">
                Tidak ada data pada pilihan filter
              </h2>
            ) : (
              <FilterTable key='rekap' tableData={tableData} />
            )
          ) : (
            ""
          )
        ) : (
          <h2 className="text-secondary mt-5">
            Pilih Opsi Tabel Terlebih Dahulu
          </h2>
        )}
      </div>
      <div className={loading ? "sweet-loading" : ""}>
        <DotLoader size={80} color={"#fff"} loading={loading} />
      </div>
    </div>
  );
}

export default FilterPage;
