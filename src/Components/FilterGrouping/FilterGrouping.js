import React from "react";

function FilterGrouping(props) {
  return (
    <div className="card card-body shadow ml-5 filter-group-body">
      <div className="option mt-4 text-left">
        <button className="bg-light d-inline mr-1 option-item">Toko</button>
        <button className="bg-light d-inline mr-1 option-item">Team</button>
        <button className="bg-light d-inline mr-1 option-item">Supplier</button>
        <button className="bg-light d-inline mr-1 option-item">Product</button>
      </div>
    </div>
  );
}

export default FilterGrouping;
