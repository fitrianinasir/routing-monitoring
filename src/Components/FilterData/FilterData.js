import React, { useEffect, useState, createContext } from "react";
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

  const API_URL =
    "https://route-monitoring.carakde.id/api_route_monitoring/api";

  function objMapping(obj) {
    Object.keys(obj).map(function (key, index) {
      let obj2 = obj[key];
      Object.keys(obj2).map(function (key, index) {
        let obj3 = obj2[key];
        let data = tableData;
        data.push(obj2[key]);
        setTableData([...data]);
        Object.keys(obj3).map(function (key, index) {
          let obj4 = obj3[key];
          // console.log('obj4', obj4)
        });
      });
    });
  }

  useEffect(() => {
    // GET TABLE DATA
    axios
      .request({
        method: "GET",
        url: `${API_URL}/merchandises`,
        params: {
          date_from: "2018-12-03",
          date_to: "2018-12-17",
          depo_id: 4,
          group_by: ["Nama_Manager", "Nama_Supervisor", "Nama_Sales"],
        },
        headers: headers,
      })
      .then((res) => {
        // let myObject = res.data.merchandises
        // Object.keys(myObject).map(function(key, index) {
        //   console.log(myObject.key[key].length)
        // });
        // setTableData(res.data.merchandises);
        // const myObject = res.data.merchandises;
        // let size = Object.keys(myObject).length;
        // if (size >= 1) {
        //   Object.keys(myObject).map(function(key, index) {
        //     let myNextObject = myObject[key]
        //     let size2 = Object.keys(myNextObject).length
        //     if(size2 >= 1){
        //       Object.keys(myNextObject).map(function(key, index) {
        //         // let myNextObject2 = myNextObject[key]
        //         // let size3 = Object.keys(myNextObject).length
        //         console.log()
        //       });
        //     }
        //   });
        // }
        const myObj = res.data.merchandises;
        objMapping(myObj);
      })
      .catch((err) => console.log(err));

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
      value: 0,
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
    console.log(choosenDepo);
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

          requestFilter,
        }}
      >
        {props.children}
      </dataContainer.Provider>
    </div>
  );
}

export default FilterData;
