import React, { useEffect, useState, createContext } from "react";
import swal from 'sweetalert';
import {API_URL} from '../BaseURL/URL'
import axios from "axios";

export const dataContainer = createContext();

const headers = {
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcm91dGUtbW9uaXRvcmluZy5jYXJha2RlLmlkXC9hcGlfcm91dGVfbW9uaXRvcmluZ1wvYXBpXC9sb2dpbiIsImlhdCI6MTU5NDA5MTc2MSwibmJmIjoxNTk0MDkxNzYxLCJqdGkiOiI4bU1HZXVDeTNQWU9TWFNYIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.g2-eK0XCQVa1skMY4Q8N74eipgxIdtE8hk7onj5Z98w",
  "Content-Type": "application/json",
};

function FilterData(props) {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // EMPLOYEES
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

  // DEPO
  const [depos, setDepos] = useState([]);
  const [choosenDepo, setChoosenDepo] = useState({});

  // DATE
  const [date, setDate] = useState(undefined);
  const [showDate, setShowDate] = useState(undefined);

  // GROUP BY
  const [groupBy, setGroupBy] = useState(undefined);

  useEffect(() => {
    // GET SALESMAN DATA
    if (salesKeyword.length >= 3) {
      setLoading(true);
      axios
        .get(
          `${API_URL}/employees/search_by_position?keyword=${salesKeyword}&type=Salesman`,
          { headers }
        )
        .then((res) => {
          console.log(res);
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
          `${API_URL}/employees/search_by_position?keyword=${supervisorKeyword}&type=Supervisor`,
          { headers }
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
          `${API_URL}/employees/search_by_position?keyword=${managerKeyword}&type=Manager`,
          { headers }
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
        .get(`${API_URL}/trips/search?code=${tripKeyword}`, { headers })
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
        .get(`${API_URL}/suppliers/search?code=${supplierKeyword}`, { headers })
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

    getDepos();
  }, [
    salesKeyword,
    supervisorKeyword,
    managerKeyword,
    tripKeyword,
    supplierKeyword,
  ]);

  function getDepos() {
    setLoading(true);
    setChoosenDepo({
      value: undefined,
      label: "Depo",
    });
    axios
      .get(`${API_URL}/depos`, { headers })
      .then((res) => {
        let deposData = res.data.depos.map((depo) => ({
          value: depo.id,
          label: depo.name,
        }));
        setDepos(deposData);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }

  function requestFilter(e) {
    e.preventDefault();

    setLoading(true)
    let salesIDs = choosenSales.map((sales) => sales.value);
    let supervisorIDs = choosenSupervisor.map((supervisor) => supervisor.value);
    let managerIDs = choosenManager.map((manager) => manager.value);

    let filterData = {
      depo_id: choosenDepo.value,
      group_by: groupBy,
      date_from: "2018-12-03",
      date_to: "2018-12-17",
    };

    // REQUIRED
    if (date !== undefined) {
      if (date.from !== undefined) {
        filterData.date_from = date.from;
        filterData.date_to = date.to;
      } else {
        filterData.date_from = date;
        filterData.date_to = date;
      }
    }

    // SALES ID NOT REQUIRED
    if (salesIDs.length > 0) {
      filterData.sales_ids = salesIDs;
    }

    // SUPERVISOR ID NOT REQUIRED
    if (supervisorIDs.length > 0) {
      filterData.supervisor_ids = supervisorIDs;
    }

    // MANAGER ID NOT REQUIRED
    if (managerIDs.length > 0) {
      filterData.manager_ids = managerIDs;
    }
    getDataTable(filterData);
  }

  function getDataTable(data) {
    axios
      .request({
        method: "GET",
        url: `${API_URL}/merchandises`,
        params: data,
        headers: headers,
      })
      .then((res) => {
        console.log('call')
        console.log(res)
        setLoading(false)
        setTableData(res.data.merchandises);
      })
      .catch((err) => {
        if(err.response.statusText === 'Unprocessable Entity'){
          swal("Gagal!", "Data tanggal, depo, dan grouping harus diisi", "error");
        }
        setLoading(false)
      });
  }

  return (
    <div>
      <dataContainer.Provider
        value={{
          loading,

          // table data
          tableData,
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

          // depos
          depos,
          choosenDepo,
          setChoosenDepo,

          // DATE
          date,
          setDate,
          showDate,
          setShowDate,
          requestFilter,

          // GROUP BY
          setGroupBy,
        }}
      >
        {props.children}
      </dataContainer.Provider>
    </div>
  );
}

export default FilterData;
