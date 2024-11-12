// src/components/Filter.jsx
import React from 'react';

function Filter({ onFilterChange }) {
  // Manejadores de cambio para actualizar los filtros
  const handleAgeChange = (e) => {
    onFilterChange({ age: e.target.value });
  };

  const handleGenderChange = (e) => {
    onFilterChange({ gender: e.target.value });
  };

  return (
    <div className="card border-0 shadow-sm mt-3">
      <div className="card-body">
        <div className="row py-3">
          <div className="form-group col-sm-12 col-lg-4">
            <label>Edad</label>
            <select className="form-select form-select-sm" onChange={handleAgeChange}>
              <option value="">Todas</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </div>
          <div className="form-group col-sm-12 col-lg-4">
            <label>Género</label>
            <select className="form-select form-select-sm" onChange={handleGenderChange}>
              <option value="">Todos</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
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
