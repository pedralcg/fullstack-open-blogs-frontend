import React from 'react';

// Componente Notification: Muestra un mensaje de notificación/error.
// Recibe un prop 'message' (el texto) y un prop 'type' ('error' o 'success').
const Notification = ({ message, type }) => {
  // Si el mensaje es nulo, no se renderiza nada.
  if (message === null) {
    return null;
  }

  // Si hay un mensaje, se renderiza dentro de un div.
  // La clase CSS aplicada será el valor de 'type' (ej. "error" o "success").
  return (
    // Usa 'type' como className
    <div className={type}>
      {message}
    </div>
  );
};

export default Notification;