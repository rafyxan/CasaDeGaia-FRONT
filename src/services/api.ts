const API_URL = 'http://localhost:5000/api';

export const enviarReserva = async (datos: any) => {
  const respuesta = await fetch(`${API_URL}/reservar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const error = await respuesta.json();
    throw new Error(error.error || 'Error al enviar la reserva');
  }

  return await respuesta.json();
};