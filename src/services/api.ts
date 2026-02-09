// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const postReserva = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/reservar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en la reserva');
  }

  return response.json();
};

export const getFechasOcupadas = async (): Promise<Date[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservas/ocupadas`);
    if (!response.ok) throw new Error('Error al obtener disponibilidad');
    
    const fechasStr: string[] = await response.json();
    
    // Convertimos los strings "YYYY-MM-DD" a objetos Date de JS
    return fechasStr.map(fechaStr => {
      const [year, month, day] = fechaStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    });
  } catch (error) {
    console.error("Error en api service:", error);
    return [];
  }
};

// --- CONTACTO Y TOURS (NUEVO) ---

/**
 * Envía el mensaje del formulario de contacto general
 */
export const postContacto = async (data: { nombre: string; email: string; telefono?: string; mensaje: string }) => {
  const response = await fetch(`${API_BASE_URL}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al enviar el mensaje');
  }

  return response.json();
};

/**
 * Envía la solicitud para una visita o tour a la casa
 */
export const postSolicitarTour = async (data: { nombre: string; email: string; telefono: string }) => {
  const response = await fetch(`${API_BASE_URL}/contacto/tour`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al solicitar el tour');
  }

  return response.json();
};

