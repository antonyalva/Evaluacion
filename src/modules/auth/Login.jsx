// src/modules/auth/Login.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Login({ onLogin }) {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Usuario o contraseña incorrectos'); // Mensaje personalizado
        }
      })
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          onLogin();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.message,
        });
        console.error('Error:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
