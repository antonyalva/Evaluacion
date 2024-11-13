// src/components/EditUserModal.jsx
import React from 'react';
import Swal from 'sweetalert2';

function EditUserModal({ user, formValues, onClose, onChange, onSave }) {
  const handleSave = () => {
    onSave(); // Llama la función onSave pasada como prop para guardar los cambios

    // Muestra la alerta de confirmación después de guardar los cambios
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Los cambios han sido guardados',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formValues.age}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formValues.email}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formValues.phone}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formValues.address}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
