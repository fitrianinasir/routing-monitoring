import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./FilterTable.css";

function FilterTable(props) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // TRANSFORM JSON
    let filterDataJSON = Object.keys(props.tableData).map((item, i) => {
      return {
        id: i + 1,
        manager_name: item,
        supervisors: Object.keys(props.tableData[item]).map((secItm, i) => {
          return {
            supervisor_name: secItm,
            salesmen: Object.keys(props.tableData[item][secItm]).map(
              (thirdItm) => ({
                salesman_name: thirdItm,
                dates: Object.keys(props.tableData[item][secItm][thirdItm]).map(
                  (date) => ({
                    salesman_name: thirdItm,
                    date: date,
                    data: props.tableData[item][secItm][thirdItm][date],
                  })
                ),
              })
            ),
          };
        }),
      };
    });

    console.log("managers : ", filterDataJSON);
    setTableData(filterDataJSON);
  }, [props.tableData]);

  return (
    <div className="filter-table">
      <table border="1" cellPadding="15" className="">
        {tableData.length > 0
          ? tableData.map((data) => {
              return (
                <tbody>
                  <tr>
                    <td>{data.manager_name}</td>
                    <td>
                      <table border="1" cellPadding="15">
                        <tbody>
                          {data.supervisors.map((spv) => (
                            <tr>
                              <td>{spv.supervisor_name}</td>
                              <td>
                                <table border="1" cellPadding="15">
                                  <tbody>
                                    {spv.salesmen.map((sales) => (
                                      <tr>
                                        <td>{sales.salesman_name}</td>
                                        <td>
                                          <table border="1" cellPadding="15">
                                            {sales.dates.map((date) => (
                                              <tbody>
                                                <tr>
                                                  <td>{date.date}</td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <table
                                                      cellPadding="5"
                                                      className="table-main-container"
                                                    >
                                                      {date.data.map((data) => (
                                                        <tbody className="table-main-content">
                                                          <Accordion className="m-3">
                                                            <Card>
                                                              <Card.Header>
                                                                <tr>
                                                                  <td>Toko</td>
                                                                  <td>
                                                                    <span className="mr-1 ml-3">
                                                                      :
                                                                    </span>
                                                                    {
                                                                      data.Nama_Pelanggan
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    Produk
                                                                  </td>
                                                                  <td>
                                                                    <span className="mr-1 ml-3">
                                                                      :
                                                                    </span>
                                                                    {
                                                                      data.Nama_Barang
                                                                    }
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    <label htmlFor="">
                                                                      Supplier
                                                                    </label>
                                                                  </td>
                                                                  <td>
                                                                    <label htmlFor="">
                                                                      <span className="mr-1 ml-3">
                                                                        :
                                                                      </span>
                                                                      {
                                                                        data.Nama_Supplier
                                                                      }
                                                                    </label>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td>
                                                                    <label htmlFor="">
                                                                      Sales
                                                                    </label>
                                                                  </td>
                                                                  <td>
                                                                    <label htmlFor="">
                                                                      <span className="mr-1 ml-3">
                                                                        :
                                                                      </span>
                                                                      {
                                                                        data.Nama_Sales
                                                                      }
                                                                    </label>
                                                                  </td>
                                                                </tr>

                                                                <Accordion.Collapse eventKey="0">
                                                                  <Card.Body className="p-0 text-left">
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Manager
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.Nama_Manager
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Supervisor
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.Nama_Supervisor
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Facing
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.facing
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Stock
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.stock
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Deal
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.deal
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Tgl
                                                                          Ambil
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.Tanggal_Pengambilan_Terakhir
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          Catatan
                                                                        </label>
                                                                      </td>
                                                                      <td>
                                                                        <label htmlFor="">
                                                                          <span className="mr-1">
                                                                            :
                                                                          </span>
                                                                          {
                                                                            data.Catatan
                                                                          }
                                                                        </label>
                                                                      </td>
                                                                    </tr>
                                                                  </Card.Body>
                                                                </Accordion.Collapse>
                                                                <Accordion.Toggle
                                                                  as={Button}
                                                                  variant="link"
                                                                  eventKey="0"
                                                                >
                                                                  Lihat lebih
                                                                  banyak
                                                                </Accordion.Toggle>
                                                              </Card.Header>
                                                            </Card>
                                                          </Accordion>
                                                        </tbody>
                                                      ))}
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            ))}
                                          </table>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              );
            })
          : ""}
      </table>
    </div>
  );
}

export default FilterTable;
