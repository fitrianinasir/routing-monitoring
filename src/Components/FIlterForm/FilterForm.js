import React, { useContext } from "react";
import MultiSelect from "react-multi-select-component";
import { dataContainer } from "../FilterData/FilterData";

function FilterForm(props) {
  const {
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
  } = useContext(dataContainer);

  return (
    <div className="card card-body shadow ml-5 filter-form-body">
      <form action="">
        <table cellPadding="15" className="text-left">
          <tbody>
            <tr>
              <td>
                <label htmlFor="">Sales</label>
              </td>
              <td>
                <MultiSelect
                  options={salesData}
                  value={choosenSales}
                  onChange={setChoosenSales}
                  labelledBy={"Select"}
                  hasSelectAll={false}
                  filterOptions={(options, filter) => {
                    if (filter.length >= 4) {
                      setEmployeeKeyword(filter);
                      return salesData;
                    }
                    return [];
                  }}
                />
                <span className="filter-input-info">
                  *bisa memasukkan beberapa data sales
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Supervisor</label>
              </td>
              <td>
                <MultiSelect
                  options={supervisorData}
                  value={choosenSupervisor}
                  onChange={setChoosenSupervisor}
                  labelledBy={"Select"}
                  hasSelectAll={false}
                  filterOptions={(options, filter) => {
                    if (filter.length >= 4) {
                      setEmployeeKeyword(filter);
                      return supervisorData;
                    }
                    return [];
                  }}
                />
                <span className="filter-input-info">
                  *bisa memasukkan beberapa data supervisor
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Manager</label>
              </td>
              <td>
                <MultiSelect
                  options={managerData}
                  value={choosenManager}
                  onChange={setChoosenManager}
                  labelledBy={"Select"}
                  hasSelectAll={false}
                  filterOptions={(options, filter) => {
                    if (filter.length >= 4) {
                      setEmployeeKeyword(filter);
                      return managerData;
                    }
                    return [];
                  }}
                />
                <span className="filter-input-info">
                  *bisa memasukkan beberapa data manager
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Tugas</label>
              </td>
              <td>
                <MultiSelect
                  options={managerData}
                  value={choosenManager}
                  onChange={setChoosenManager}
                  labelledBy={"Select"}
                  hasSelectAll={false}
                  filterOptions={(options, filter) => {
                    if (filter.length >= 4) {
                      setEmployeeKeyword(filter);
                      return managerData;
                    }
                    return [];
                  }}
                />
                <span className="filter-input-info">
                  *nomor tugas adalah nomor perjalanan atau ID perjalanan sales,
                  bisa mengisi lebih dari satu kode tugas
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Pemasok</label>
              </td>
              <td>
                <MultiSelect
                  options={managerData}
                  value={choosenManager}
                  onChange={setChoosenManager}
                  labelledBy={"Select"}
                  hasSelectAll={false}
                  filterOptions={(options, filter) => {
                    if (filter.length >= 4) {
                      setEmployeeKeyword(filter);
                      return managerData;
                    }
                    return [];
                  }}
                />
                <span className="filter-input-info">
                  *bisa memasukkan lebih dari satu pemasok
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-primary float-right mt-4 mr-2"
        >
          Terapkan Filter
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
