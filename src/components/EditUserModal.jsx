// src/components/EditUserModal.jsx
import React from 'react';

function EditUserModal({ user, formValues, onClose, onChange, onSave }) {
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
            <button type="button" className="btn btn-primary" onClick={onSave}>Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
