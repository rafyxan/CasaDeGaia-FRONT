// src/hooks/useReserva.ts
import { useState } from 'react';
import { postReserva } from '../services/api';

export const useReserva = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enviarReserva = async (datosReserva: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postReserva(datosReserva);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { enviarReserva, loading, error };
};