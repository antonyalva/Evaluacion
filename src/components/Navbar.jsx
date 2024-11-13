// src/Navbar.jsx
import React, { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('https://dummyjson.com/user/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    setUser(null); // Reinicia el estado del usuario
    window.location.reload(); // Refresca la página para regresar al estado de no autenticado
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <img 
                    src={user.image} 
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="rounded-circle me-2" 
                    style={{ width: '30px', height: '30px' }} 
                  />
                  <span className="navbar-text me-3">
                    Bienvenido, {user.firstName} {user.lastName}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="navbar-text">Iniciar sesión</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
