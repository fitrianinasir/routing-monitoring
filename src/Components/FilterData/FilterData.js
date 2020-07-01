import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const dataContainer = createContext();
function FilterData(props) {
  const [loading, setLoading] = useState(false);
  // const [tableData, setTableData] = useState({});
  const [salesKeyword, setSalesKeyword] = useState("");
  const [supervisorKeyword, setSupervisorKeyword] = useState("");
  const [managerKeyword, setManagerKeyword] = useState("");
  const [tripKeyword, setTripKeyword] = useState("");
  const [supplierKeyword, setSupplierKeyword] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [choosenSales, setChoosenSales] = useState([]);
  const [choosenSupervisor, setChoosenSupervisor] = useState([]);
  const [choosenManager, setChoosenManager] = useState([]);
  const [choosenTrip, setChoosenTrip] = useState([]);
  const [choosenSupplier, setChoosenSupplier] = useState([]);

  const API_URL =
    "https://route-monitoring.carakde.id/api_route_monitoring/api/v1";

  useEffect(() => {
    // GET SALESMAN DATA
    if (salesKeyword.length >= 3) {
      setLoading(true);
      axios
        .get(
          `${API_URL}/employees/search_by_position?keyword=${salesKeyword}&type=Salesman`
        )
        .then((res) => {
          let salesman = res.data.employees.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setSalesData(salesman);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    // GET SUPERVISOR DATA
    if (supervisorKeyword.length >= 3) {
      setLoading(true);
      axios
        .get(
          `${API_URL}/employees/search_by_position?keyword=${supervisorKeyword}&type=Supervisor`
        )
        .then((res) => {
          let supervisors = res.data.employees.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setSupervisorData(supervisors);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    // GET MANAGER DATA
    if (managerKeyword.length >= 3) {
      setLoading(true);
      axios
        .get(
          `${API_URL}/employees/search_by_position?keyword=${managerKeyword}&type=Manager`
        )
        .then((res) => {
          let managers = res.data.employees.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }));
          setManagerData(managers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    if (tripKeyword.length >= 3) {
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

    if (supplierKeyword.length >= 3) {
      setLoading(true);
      axios
        .get(`${API_URL}/suppliers/search?code=${supplierKeyword}`)
        .then((res) => {
          console.log(res);
          let suppliers = res.data.suppliers.map((supplier) => ({
            value: supplier.id,
            label: supplier.name,
          }));
          setSupplierData(suppliers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [salesKeyword, supervisorKeyword, managerKeyword, tripKeyword, supplierKeyword]);

  return (
    <div>
      <dataContainer.Provider
        value={{
          loading,
          // employee
          setSalesKeyword,
          setSupervisorKeyword,
          setManagerKeyword,
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
          setChoosenSupplier,
        }}
      >
        {props.children}
      </dataContainer.Provider>
    </div>
  );
}

export default FilterData;
