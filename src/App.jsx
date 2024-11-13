import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import UserTable from './components/UserTable';
import Login from './modules/auth/Login';
import UserPost from './components/UserPost';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ age: '', gender: '' });
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el ID del usuario seleccionado

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  };

  // Función de autenticación
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Maneja la selección de un usuario desde UserTable
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseUserPost = () => {
    setSelectedUserId(null); // Restablece el ID del usuario seleccionado para cerrar `UserPost`
  };

  // Mostrar vista de inicio de sesión si el usuario no está autenticado
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="fs-1 fst-italic ">Listado de usuarios</div>
          </div>
          <div className="col-sm-12 col-md-6 mt-3">
            <div className="d-flex justify-content-end align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={toggleFilter}
              >
                <i className="bi bi-sliders me-2"></i>
                Filtros
              </button>
            </div>
          </div>
        </div>
        {showFilter &&
          <Filter onFilterChange={handleFilterChange} />
        }
        <UserTable onSelectUser={handleUserSelect} />

        {/* Mostrar UserPost solo si se ha seleccionado un usuario */}
        {selectedUserId && <UserPost userId={selectedUserId} onClose={handleCloseUserPost} />}
      </div>
    </>
  );
}

export default App;
