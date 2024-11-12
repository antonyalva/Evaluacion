import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import EditUserModal from './EditUserModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function UserTable({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar el modal

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const table = $('#userTable').DataTable({
        responsive: true,
        language: {
          search: 'Buscar:',
          searchPlaceholder: 'Filtrar...',
          lengthMenu: 'Mostrar _MENU_ registros',
          info: '#Registros _END_ de _TOTAL_ ',
          paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior',
          },
        },
      });

      return () => {
        table.destroy();
      };
    }
  }, [users]);

  const handleRowSelect = (event, id) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, id];
      } else {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
    });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Mostrar el modal de confirmación
  };

  const confirmDelete = async () => {
    for (const userId of selectedRows) {
      try {
        await fetch(`https://dummyjson.com/users/${userId}`, {
          method: 'DELETE',
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    setSelectedRows([]);
    setShowDeleteModal(false); // Ocultar el modal después de confirmar
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      phone: user.phone,
      address: user.address?.address || '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const saveEditUser = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editUser.id ? updatedUser : user))
      );

      setEditUser(null); // Cierra el modal de edición
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-header d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => openEditModal(users.find((user) => selectedRows.includes(user.id)))}
          disabled={selectedRows.length !== 1}
        >
          <i className="bi bi-pencil"></i> Editar
        </button>

        {/* Usar el modal de confirmación para eliminar */}
        <button
          type="button"
          className="btn btn-sm btn-outline-danger px-4 me-2"
          onClick={handleDeleteClick}
          disabled={selectedRows.length === 0}
        >
          <i className="bi bi-trash3"></i> Eliminar
        </button>
      </div>
      <div className="card-body">
        <table id="userTable" className="table table-hover table-light dataTable no-footer">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} onClick={() => onSelectUser(user.id)}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleRowSelect(e, user.id)}
                  />
                </td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address?.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal de Edición */}
      {editUser && (
        <EditUserModal
          user={editUser}
          formValues={formValues}
          onClose={() => setEditUser(null)}
          onChange={handleFormChange}
          onSave={saveEditUser}
        />
      )}
    </div>
  );
}

export default UserTable;
