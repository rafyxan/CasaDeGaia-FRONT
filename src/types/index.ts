// src/types/index.ts
export interface ReservaPayload {
  nombre: string;
  correo: string;
  telefono: string;
  tipo_tarifa: string;
  fecha_entrada: string;
  fecha_salida: string;
  hora_entrada: string;
  hora_salida: string;
  adultos: number;
  ninos: number;
  total_personas: number;
  noches: number;
  precio_total: number;
  pago_plazos: boolean;
}