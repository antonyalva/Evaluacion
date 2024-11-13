import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

function DeleteConfirmationModal({ show, onClose, onConfirm }) {
  useEffect(() => {
    if (show) {
      Swal.fire({
        title: 'Confirmación de Eliminación',
        text: '¿Estás seguro de que deseas eliminar los usuarios seleccionados?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        }
        onClose();
      });
    }
  }, [show, onClose, onConfirm]);

  return null; 
}

export default DeleteConfirmationModal;
