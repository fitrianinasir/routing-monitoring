import React, { useState, useContext } from "react";
import { dataContainer } from "../FilterData/FilterData";

function FilterGrouping(props) {
  const { setGroupBy } = useContext(dataContainer);
  const [isTeam, setIsTeam] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  function getGrouping(value) {
    if (value === "team") {
      setIsTeam(true);
      setIsCustomer(false);
      setIsSupplier(false);
      setIsProduct(false);
      setGroupBy(["Nama_Manager", "Nama_Supervisor", "Nama_Sales"]);
    } else if (value === "customer") {
      setIsTeam(false);
      setIsCustomer(true);
      setIsSupplier(false);
      setIsProduct(false);
      setGroupBy("Nama_Pelanggan");
    } else if (value === "supplier") {
      setIsTeam(false);
      setIsCustomer(false);
      setIsSupplier(true);
      setIsProduct(false);
      setGroupBy("Nama_Supplier");
    } else if (value === "product") {
      setIsTeam(false);
      setIsCustomer(false);
      setIsSupplier(false);
      setIsProduct(true);
      setGroupBy("Nama_Barang");
    }
  }

  return (
    <div className="card card-body shadow ml-5 filter-group-body">
      <div className="option mt-4 text-left">
        <button
          value="team"
          className={
            isTeam
              ? "bg-primary text-light d-inline mr-1 option-item"
              : "bg-light d-inline mr-1 option-item"
          }
          onClick={(e) => getGrouping(e.target.value)}
        >
          Team
        </button>
        <button
          value="customer"
          className={
            isCustomer
              ? "bg-primary text-light d-inline mr-1 option-item"
              : "bg-light d-inline mr-1 option-item"
          }
          onClick={(e) => getGrouping(e.target.value)}
        >
          Customer
        </button>
        <button
          value="supplier"
          className={
            isSupplier
              ? "bg-primary text-light d-inline mr-1 option-item"
              : "bg-light d-inline mr-1 option-item"
          }
          onClick={(e) => getGrouping(e.target.value)}
        >
          Supplier
        </button>
        <button
          value="product"
          className={
            isProduct
              ? "bg-primary text-light d-inline mr-1 option-item"
              : "bg-light d-inline mr-1 option-item"
          }
          onClick={(e) => getGrouping(e.target.value)}
        >
          Product
        </button>
      </div>
    </div>
  );
}

export default FilterGrouping;
