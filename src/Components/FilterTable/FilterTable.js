import React, { useState, useEffect, useContext } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { IMG_URL } from "../BaseURL/URL";
import { dataContainer } from "../FilterData/FilterData";
import "./FilterTable.css";

function FilterTable(props) {
  const {
    isTeamData,
  } = useContext(dataContainer);
  const [tableData, setTableData] = useState([]);
  const [salesCol, setSalesCol] = useState([]);
  const [spvCol, setSpvCol] = useState([]);
  const [btnValues, setBtnValues] = useState([]);
  const [count, setCount] = useState(0);

  let DATA = props.tableData;
  let KEY = props.keyData;
  useEffect(() => {
    if (KEY === "report") {
      // TRANSFORM JSON
      let filterDataJSON = Object.keys(DATA).map((item, i) => {
        return {
          id: i + 1,
          manager_name: item,
          supervisors: Object.keys(DATA[item]).map((secItm, i) => {
            return {
              supervisor_name: secItm,
              salesmen: Object.keys(DATA[item][secItm]).map((thirdItm) => ({
                supervisor_name: secItm,
                salesman_name: thirdItm,
                dates: Object.keys(DATA[item][secItm][thirdItm]).map(
                  (date) => ({
                    salesman_name: thirdItm,
                    date: date,
                    data: DATA[item][secItm][thirdItm][date],
                  })
                ),
              })),
            };
          }),
        };
      });
      setTableData(filterDataJSON);

      // DATES FOR SALES COLSPAN CONTROLLER
      let dates = salesCol;
      filterDataJSON.map((data) =>
        data.supervisors.map((spv) =>
          spv.salesmen.forEach((sales) => {
            dates.push({
              spv_name: sales.supervisor_name,
              number_of_dates: sales.dates.length,
            });
            setSalesCol(dates);
          })
        )
      );

      // SALES FOR SPV COLSPAN CONTROLLER
      let result = [];
      dates.reduce(function (temporaryResult, valueOfDates) {
        if (!temporaryResult[valueOfDates.spv_name]) {
          temporaryResult[valueOfDates.spv_name] = {
            spv_name: valueOfDates.spv_name,
            number_of_dates: 0,
          };
          result.push(temporaryResult[valueOfDates.spv_name]);
        }
        temporaryResult[valueOfDates.spv_name].number_of_dates +=
          valueOfDates.number_of_dates;
        return temporaryResult;
      }, {});
      setSpvCol(result);

      let buttonsValue = [];
      filterDataJSON.map((data) =>
        data.supervisors.map((spv) =>
          spv.salesmen.map((sales) =>
            sales.dates.map((date) =>
              date.data.forEach((content) => {
                buttonsValue.push({
                  id: content.id,
                  value: false,
                });
              })
            )
          )
        )
      );
      console.log(filterDataJSON);
      console.log(buttonsValue);
      console.log(result);
      console.log(dates);
      setBtnValues(buttonsValue);
    } else if (KEY === "rekap") {
      alert("REKAP DATA");
    }
  }, [DATA, salesCol, KEY]);

  function changeTextBtn(id) {
    setCount(count + 1);
    let buttons = btnValues;
    buttons.filter((btn) => {
      if (btn.id === id) {
        btn.value = !btn.value;
        return btn;
      }
      return btn;
    });
    setBtnValues(buttons);
  }

  function dateCoverter(value) {
    let days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    let date = new Date(value);
    let day = date.getDay();
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!

    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let set_date = days[day - 1] + ", " + dd + "/" + mm + "/" + yyyy;
    return set_date;
  }

  return (
    <div>
      <div className="filter-table">
        {tableData.length > 0 ? (
          <table border="1" cellPadding="15">
            <tbody>
              {isTeamData ? (
                <tr>
                  <td>Team</td>
                  {tableData.map((data) =>
                    data.supervisors.map((spv) =>
                      spv.salesmen.map((sales) =>
                        sales.dates.map((date) => (
                          <td>{dateCoverter(date.date)}</td>
                        ))
                      )
                    )
                  )}
                </tr>
              ) : (
                ""
              )}
              {tableData.map((data) =>
                data.supervisors.map((spv) =>
                  spv.salesmen.map((salesData) => (
                    <tr>
                      <td className="text-left">
                        <table cellPadding="10" style={{ width: "20rem" }}>
                          <tbody>
                            <tr>
                              <td>
                                <label htmlFor="">Manajer</label>
                              </td>
                              <td>: {data.manager_name}</td>
                            </tr>
                            <tr>
                              <td>
                                <label htmlFor="">Supervisor</label>
                              </td>
                              <td>: {spv.supervisor_name}</td>
                            </tr>
                            <tr>
                              <td>
                                <label htmlFor="">Sales</label>
                              </td>
                              <td>: {salesData.salesman_name}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      {tableData.map((data) =>
                        data.supervisors.map((spv) =>
                          spv.salesmen.map((sales) =>
                            sales.dates.map((date) => (
                              <td valign="top">
                                <div className="table-main-container">
                                  {date.salesman_name === salesData.salesman_name
                                    ? date.data.map((content) => (
                                        <tr>
                                          <Accordion className="m-3">
                                            <Card>
                                              <Card.Header>
                                                <tr className="grid-accordion">
                                                  <td>Toko</td>
                                                  <td className="td-value">
                                                    : {content.Nama_Pelanggan}
                                                  </td>
                                                </tr>
                                                <tr className="grid-accordion">
                                                  <td>Produk</td>
                                                  <td className="td-value">
                                                    : {content.Nama_Barang}
                                                  </td>
                                                </tr>
                                                <tr className="grid-accordion">
                                                  <td>
                                                    <label htmlFor="">
                                                      Supplier
                                                    </label>
                                                  </td>
                                                  <td className="td-value">
                                                    <label htmlFor="">
                                                      : {content.Nama_Supplier}
                                                    </label>
                                                  </td>
                                                </tr>
                                                <tr className="grid-accordion">
                                                  <td>
                                                    <label htmlFor="">
                                                      Sales
                                                    </label>
                                                  </td>
                                                  <td className="td-value">
                                                    <label htmlFor="">
                                                      : {content.Nama_Sales}
                                                    </label>
                                                  </td>
                                                </tr>

                                                <Accordion.Collapse eventKey="0">
                                                  <Card.Body className="p-0 text-left">
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Manager
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          :{" "}
                                                          {content.Nama_Manager}
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Supervisor
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          :{" "}
                                                          {
                                                            content.Nama_Supervisor
                                                          }
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Facing
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          : {content.facing}
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Stock
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          : {content.stock}
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Deal
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          : {content.deal}
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Tgl Ambil
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          {
                                                            content.Tanggal_Pengambilan_Terakhir
                                                          }
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <tr className="grid-accordion">
                                                      <td>
                                                        <label htmlFor="">
                                                          Catatan
                                                        </label>
                                                      </td>
                                                      <td className="td-value">
                                                        <label htmlFor="">
                                                          : {content.Catatan}
                                                        </label>
                                                      </td>
                                                    </tr>
                                                    <div className="img-container">
                                                      {content.merchandise_images.map(
                                                        (img) => (
                                                          <img
                                                            src={`${IMG_URL}/${img.image_path}`}
                                                            alt=""
                                                            width="100"
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                  </Card.Body>
                                                </Accordion.Collapse>
                                                <Accordion.Toggle
                                                  as={Button}
                                                  variant="link"
                                                  eventKey="0"
                                                  className="float-left accordion-btn"
                                                  onClick={() =>
                                                    changeTextBtn(content.id)
                                                  }
                                                >
                                                  {btnValues.length > 0
                                                    ? btnValues.map((btn) =>
                                                        btn.id === content.id
                                                          ? btn.value
                                                            ? "Lihat lebih sedikit"
                                                            : "Lihat lebih banyak"
                                                          : ""
                                                      )
                                                    : ""}
                                                  <i className="fas fa-chevron-right ml-2"></i>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </tr>
                                      ))
                                    : ""}
                                </div>
                              </td>
                            ))
                          )
                        )
                      )}
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default FilterTable;
