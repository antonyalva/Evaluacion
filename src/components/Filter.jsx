import React from 'react';

function Filter({ onFilterChange }) {
  const handleGenderChange = (e) => {
    onFilterChange({ gender: e.target.value });
  };

  return (
    <div className="card border-0 shadow-sm mt-3">
      <div className="card-body">
        <div className="row py-3">
          <div className="form-group col-sm-12 col-lg-4">
            <label>Género</label>
            <select className="form-select form-select-sm" onChange={handleGenderChange}>
              <option value="">Todos</option>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </div>
          <div className="col-sm-12 col-lg-4">
            <button className="btn btn-sm btn-primary mt-4" onClick={() => onFilterChange({ apply: true })}>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
