// src/modules/auth/Login.jsx
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Resetea cualquier error previo

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
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
      })
      .then((data) => {
        if (data.accessToken) {  // Usa accessToken en lugar de token
          localStorage.setItem('token', data.accessToken);  
          onLogin(); // Llama a la función de autenticación
        } else {
          setError('Error: Usuario o contraseña incorrectos');
        }
      })
      .catch((error) => {
        setError(`Error de inicio de sesión: ${error.message}`);
        console.error('Error:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
            //   value={'emilys'}
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
            //   value={'emilyspass'}
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
