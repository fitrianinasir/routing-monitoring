import React from "react";
import './FilterForm.css'

function FilterForm(props) {
  return (
    <div
      className="card card-body shadow ml-5 filter-form-body"
    >
      <form action="">
        <table cellPadding="15" className="text-left">
          <tbody>
            <tr>
              <td>
                <label htmlFor="">Karyawan</label>
              </td>
              <td>
                <input
                  type="text"
                  className="w-100 filter-input"
                  placeholder="Masukkan nama karyawan"
                />
                <span className="filter-input-info">*bisa memasukkan beberapa data karyawan</span>
              </td>
              
            </tr>
            <tr>
              <td>
                <label htmlFor="">Tugas</label>
              </td>
              <td>
                <input
                  type="text"
                  className="w-100 filter-input"
                  placeholder="Masukkan kode tugas"
                />
                <span className="filter-input-info">*nomor tugas adalah nomor perjalanan atau ID perjalanan sales, bisa mengisi lebih dari satu kode tugas</span>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Pemasok</label>
              </td>
              <td>
                <input
                  type="text"
                  className="w-100 filter-input"
                  placeholder="Masukkan nama pemasok"
                />
                <span className="filter-input-info">*bisa memasukkan lebih dari satu pemasok</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-primary float-right mt-4 mr-2"
          style={{ fontSize: "12px" }}
        >
          Terapkan Filter
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
