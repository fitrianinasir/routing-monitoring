import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { dataContainer } from "../FilterData/FilterData";

function FilterGrouping(props) {
  const {
    setIsTeamData,
    setIsCustomerData,
    setIsSupplierData,
    setIsProductData,
    setGroupBy,
  } = useContext(dataContainer);

  const [isTeam, setIsTeam] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  const [grouping] = useState([]);
  const { urlName } = useParams();

  async function getGrouping(value) {
    let group = grouping;
    if (value === "team") {
      setIsTeam(!isTeam);
      if (isTeam) {
        if (urlName === "report") {
          group = group.filter(
            (data) =>
              data !== "Nama_Manager" &&
              data !== "Nama_Supervisor" &&
              data !== "Nama_Sales"
          );
          setIsTeamData(false)
        } else if (urlName === "rekap") {
          group = group.filter((data) => data !== "team");
          setIsTeamData(false)
        }
      } else {
        if (urlName === "report") {
          group.push("Nama_Manager", "Nama_Supervisor", "Nama_Sales");
          setIsTeamData(true)
        } else if (urlName === "rekap") {
          group.push("team");
          setIsTeamData(true)
        }
      }
    } else if (value === "customer") {
      setIsCustomer(!isCustomer);
      if (isCustomer) {
        if (urlName === "report") {
          group = group.filter((data) => data !== "Nama_Pelanggan");
          setIsCustomerData(false)
        } else if (urlName === "rekap") {
          group = group.filter((data) => data !== "pelanggan");
          setIsCustomerData(false)
        }
      } else {
        if (urlName === "report") {
          group.push("Nama_Pelanggan");
          setIsCustomerData(true)
        } else if (urlName === "rekap") {
          group.push("pelanggan");
          setIsCustomerData(true)
        }
      }
    } else if (value === "supplier") {
      setIsSupplier(!isSupplier);
      if (isSupplier) {
        if (urlName === "report") {
          group = group.filter((data) => data !== "Nama_Supplier");
          setIsSupplierData(false)
        } else if (urlName === "rekap") {
          group = group.filter((data) => data !== "supplier");
          setIsSupplierData(false)
        }
      } else {
        if (urlName === "report") {
          group.push("Nama_Supplier");
          setIsSupplierData(true)
        } else if (urlName === "rekap") {
          group.push("supplier");
          setIsSupplierData(true)
        }
      }
    } else if (value === "product") {
      setIsProduct(!isProduct);
      if (isProduct) {
        if (urlName === "report") {
          group = group.filter((data) => data !== "Nama_Barang");
          setIsProductData(false)
        } else if (urlName === "rekap") {
          group = group.filter((data) => data !== "barang");
          setIsProductData(false)
        }
      } else {
        if (urlName === "report") {
          group.push("Nama_Barang");
          setIsProductData(true)
        } else if (urlName === "rekap") {
          group.push("barang");
          setIsProductData(true)
        }
      }
    }
    console.log("group", group);
    setGroupBy(group);
  }

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
