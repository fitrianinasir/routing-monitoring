import React, { useEffect } from "react";
import "./FilterTable.css";

function FilterTable(props) {
  useEffect(() => {
    // FIRST FILTER
    let filterDataJSON = Object.keys(props.tableData).map((item, i) => {
      return {
        id: i + 1,
        manager: item,
        supervisors: Object.keys(props.tableData[item]).map((secItm, i) => {
          return {
            supervisor: secItm,
          };
        }),
        salesmen: Object.values(props.tableData[item]),
      };
    });

    let flattendData = flatMap(filterDataJSON, (salesman) => salesman.salesmen);
    let filterFlatData = flattendData
      .map((itemx) => Object.values(itemx))
      .flat(1);

    let mappingTgl = filterFlatData
      .map((item_date, i) =>
        Object.keys(item_date).map((itemd, k) => item_date[itemd])
      )
      .flat(2);

    mappingTgl.map((date, index) => {
      mappingTgl.map((date2, index2) => {
        if (index !== index2) {
          if (date === date2) {
            console.log(date);
          }
        }
      });
    });

    // console.log(filterDataJSON);
    // console.log(flattendData);
    // console.log(filterFlatData);
    let result = groupData(mappingTgl);
    console.log(mappingTgl);
    console.log(result.data);
  }, [props.tableData]);

  function flatMap(array, callback) {
    const flattend = [];
    for (let i = 0; i < array.length; i++) {
      const elementArr = callback(array[i], i, array);
      for (const el of elementArr) {
        flattend.push(el);
      }
    }
    return flattend;
  }

  function groupData(array) {
    let g = Object.entries(
      array.reduce((array, c) => ((array[c.Tanggal] = [...(array[c.Tanggal] || []), c]), array), {})
    );
    return g.reduce(
      (array, c, i) => (array.data.push({ id: i + 1, Tanggal: c[0], data: c[1] }), array),
      { data: [] }
    );
  }

  return <div className="filter-table"></div>;
}

export default FilterTable;
