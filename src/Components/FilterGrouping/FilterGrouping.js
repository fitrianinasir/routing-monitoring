import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { dataContainer } from "../FilterData/FilterData";
import { useEffect } from "react";

function FilterGrouping(props) {
  const {
    setIsTeamData,
    setIsCustomerData,
    setIsSupplierData,
    setIsProductData,
    setGroupBy,
  } = useContext(dataContainer);

  const [key, setKey] = useState("");
  const [isTeam, setIsTeam] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  const [grouping, setGrouping] = useState([]);
  const { urlName } = useParams();

  useEffect(() => {
    let group = [...grouping];
    if (key === "team") {
      if (isTeam) {
        group.push("Nama_Manager", "Nama_Supervisor", "Nama_Sales");
      } else {
        let removeItem = ["Nama_Manager", "Nama_Supervisor", "Nama_Sales"];
        group = group.filter((i) => !removeItem.includes(i));
      }
    } else if (key === "customer") {
      if (isCustomer) {
        group.push("Nama_Pelanggan");
      } else {
        let removeItem = ["Nama_Pelanggan"];
        group = group.filter((i) => !removeItem.includes(i));
      }
    } else if (key === "supplier") {
      if (isSupplier) {
        group.push("Nama_Supplier");
      } else {
        let removeItem = ["Nama_Supplier"];
        group = group.filter((i) => !removeItem.includes(i));
      }
    } else if (key === "product") {
      if (isProduct) {
        group.push("Nama_Barang");
      } else {
        let removeItem = ["Nama_Barang"];
        group = group.filter((i) => !removeItem.includes(i));
      }
    }

    console.log(group);
    setGrouping(group);
  }, [key, isTeam, isCustomer, isSupplier, isProduct]);

  return (
    <div className="card card-body shadow ml-5 filter-group-body">
      <div className="option mt-2 text-left">
        <button
          value="team"
          className={
            isTeam
              ? "bg-primary text-light d-inline mr-1 option-item"
              : "bg-light d-inline mr-1 option-item"
          }
          onClick={(e) => {
            setIsTeam(!isTeam);
            setKey(e.target.value);
          }}
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
          onClick={(e) => {
            setIsCustomer(!isCustomer);
            setKey(e.target.value);
          }}
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
          onClick={(e) => {
            setIsSupplier(!isSupplier);
            setKey(e.target.value);
          }}
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
          onClick={(e) => {
            setIsProduct(!isProduct);
            setKey(e.target.value);
          }}
        >
          Product
        </button>
      </div>
    </div>
  );
}

export default FilterGrouping;
