import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const dataContainer = createContext();
function FilterData(props) {
  const [loading, setLoading] = useState(false);
  // const [tableData, setTableData] = useState({});
  const [employeeKeyword, setEmployeeKeyword] = useState("");
  const [tripKeyword, setTripKeyword] = useState("");
  const [supplierKeyword, setSupplierKeyword] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [supplierData, setSupplierData] = useState([])
  const [choosenSales, setChoosenSales] = useState([]);
  const [choosenSupervisor, setChoosenSupervisor] = useState([]);
  const [choosenManager, setChoosenManager] = useState([]);
  const [choosenTrip, setChoosenTrip] = useState([]);
  const [choosenSupplier, setChoosenSupplier] = useState([])

  const API_URL =
    "https://route-monitoring.carakde.id/api_route_monitoring/api/v1";

  useEffect(() => {
    // GET EMPLOYEES DATA
    if (employeeKeyword.length >=3) {
      setLoading(true);
      axios
        .get(`${API_URL}/employees/search?keyword=${employeeKeyword}`)
        .then((res) => {
          // GET SALESMAN DATA
          let salesmanFilter = res.data.employees.filter(
            (employee) => employee.position.name === "Salesman"
          );
          let salesman = salesmanFilter.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setSalesData(salesman);

          // GET SUPERVISOR DATA
          let supervisorFilter = res.data.employees.filter(
            (employee) => employee.position.name === "Supervisor"
          );
          let supervisors = supervisorFilter.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setSupervisorData(supervisors);

          // GET MANAGER DATA
          let managerFilter = res.data.employees.filter(
            (employee) => employee.position.name === "Manager"
          );
          let managers = managerFilter.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setManagerData(managers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } 
    
    if (tripKeyword.length >=3) {
      setLoading(true);
      axios
        .get(`${API_URL}/trips/search?code=${tripKeyword}`)
        .then((res) => {
          let trips = res.data.trips.map((trip) => ({
            value: trip.id,
            label: trip.Kd_DSJP,
          }));
          setTripData(trips);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    if(supplierKeyword.length>=3){
      setLoading(true);
      axios
        .get(`${API_URL}/suppliers/search?code=${supplierKeyword}`)
        .then((res) => {
          console.log(res)
          let suppliers = res.data.suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }));
          setSupplierData(suppliers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    // ----------------------------------------------------------------

    // GET TRIP DATA

    // ----------------------------------------------------------------

    // GET SUPLIER DATA

    // ----------------------------------------------------------------

    // GET MERCHANDISES
    // axios
    //   .request({
    //     method: "GET",
    //     url: `${API_URL}/merchandises`,
    //     params: {
    //       date_from: "2018-12-03",
    //       date_to: "2018-12-17",
    //       depo_id: 4,
    //       group_by: ["Nama_Manager", "Nama_Supervisor", "Nama_Sales"],
    //     },
    //   })
    //   .then((res) => {
    //     setTableData(res);
    //   })
    //   .catch((err) => {});
  }, [employeeKeyword, tripKeyword, supplierKeyword]);

  return (
    <div>
      <dataContainer.Provider
        value={{
          loading,

          // employee
          setEmployeeKeyword,
          salesData,
          choosenSales,
          setChoosenSales,
          supervisorData,
          choosenSupervisor,
          setChoosenSupervisor,
          managerData,
          choosenManager,
          setChoosenManager,

          // trip
          setTripKeyword,
          tripData,
          choosenTrip,
          setChoosenTrip,

          // supplier
          setSupplierKeyword,
          supplierData,
          choosenSupplier,
          setChoosenSupplier
        }}
      >
        {props.children}
      </dataContainer.Provider>
    </div>
  );
}

export default FilterData;
