import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faCalendarAlt, 
  faUsers, 
  faArrowLeft, 
  faClock,
  faMoon 
} from '@fortawesome/free-solid-svg-icons';

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Para el botón de volver atrás
  const initialPack = searchParams.get('pack') || 'estandar';

  // ESTADOS DEL FORMULARIO
  const [pack, setPack] = useState(initialPack);
  const [adults, setAdults] = useState(10);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('');
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(0);

  // LÓGICA DE CÁLCULO DE PRECIO Y HORA DE SALIDA
  useEffect(() => {
    // 1. Calcular Hora de Salida
    if (startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      let duration = (pack === 'casa_completa') ? 24 : 14; // 12h + 2h gratis = 14h
      
      const endHours = (hours + duration) % 24;
      const formattedEnd = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      setEndTime(formattedEnd);
    }

    // 2. Calcular Precio Total
    let subtotal = 0;
    const totalPeople = adults + kids;

    if (pack === 'estandar') {
      subtotal = (adults * 35) + (kids * 15);
    } else if (pack === 'premium') {
      subtotal = (adults * 50) + (kids * 20);
    } else if (pack === 'casa_completa') {
      const pricePerPerson = (adults * 35) + (kids * 15);
      const baseHouse = 450;
      const extraNightsPrice = nights > 1 ? (nights - 1) * (baseHouse * 0.5) : 0;
      subtotal = baseHouse + extraNightsPrice + pricePerPerson;
    }

    // Aplicar Descuentos por Grupos
    let discount = 0;
    if (totalPeople >= 70) discount = 0.20;
    else if (totalPeople >= 50) discount = 0.15;
    else if (totalPeople >= 30) discount = 0.10;

    subtotal = subtotal * (1 - discount);
    setTotal(Math.round(subtotal));

  }, [pack, adults, kids, nights, startTime]);

  return (
    <section className="min-h-screen bg-[#fdfdfb] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* BOTÓN VOLVER ATRÁS */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-title-sage hover:text-[#a3b355] transition-colors font-semibold"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver a tarifas
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h2 className="text-3xl font-serif text-title-sage mb-6">Configura tu Reserva</h2>
              
              <div className="space-y-6">
                {/* Selección de Pack */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Tu Pack Seleccionado</label>
                  <select 
                    value={pack} 
                    onChange={(e) => setPack(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#a3b355] outline-none bg-gray-50 font-medium"
                  >
                    <option value="estandar">Tarifa Estándar - 12h (+2h gratis)</option>
                    <option value="premium">Pack Premium - 12h (Limpieza y Decoración)</option>
                    <option value="casa_completa">Casa Completa (24h con Pernocta)</option>
                  </select>
                </div>

                {/* Fecha y Horas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Fecha</label>
                    <input 
                      type="date" 
                      className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#a3b355]"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hora Inicio</label>
                    <input 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#a3b355]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Hora Salida</label>
                    <div className="w-full p-4 rounded-xl border border-transparent bg-[#f5f5f0] text-[#7a8a46] font-bold flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faClock} />
                      {endTime}
                    </div>
                  </div>
                </div>

                {/* Asistentes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fdfdfb] p-4 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Adultos (mín. 10)</label>
                    <input 
                      type="number" 
                      min="10" 
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-transparent text-xl font-bold outline-none"
                    />
                  </div>
                  <div className="bg-[#fdfdfb] p-4 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Niños (6-12 años)</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={kids}
                      onChange={(e) => setKids(Number(e.target.value))}
                      className="w-full bg-transparent text-xl font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Noches condicionales */}
                {pack === 'casa_completa' && (
                  <div className="p-6 bg-[#f5f5f0] rounded-2xl border border-[#c2c086]/30 animate-fade-in">
                    <label className="block text-sm font-bold text-[#7a8a46] mb-2 text-center">
                      ¿Cuántas noches os quedáis?
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border-none text-center text-2xl font-bold bg-white outline-none"
                    />
                    <p className="text-[11px] text-center mt-3 text-gray-500 italic">
                      La primera noche incluye la casa completa. Noches adicionales tienen un 50% de descuento.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#c2c086]/30 sticky top-8">
              <h3 className="text-xl font-serif text-title-sage mb-6 border-b pb-4">Tu Presupuesto</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duración:</span>
                  <span className="font-bold text-gray-700">{pack === 'casa_completa' ? '24h' : '14h (12+2)'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total personas:</span>
                  <span className="font-bold text-gray-700">{adults + kids}</span>
                </div>
                
                {/* Indicador de descuento */}
                {(adults + kids >= 30) && (
                  <div className="p-3 bg-green-50 rounded-xl text-green-700 text-xs font-bold flex items-center gap-2">
                    <FontAwesomeIcon icon={faUsers} />
                    ¡Descuento aplicado por grupo grande!
                  </div>
                )}

                <div className="pt-6 border-t">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Total Final</p>
                  <div className="flex items-baseline gap-1 text-[#a3b355]">
                    <span className="text-5xl font-serif font-bold">{total}</span>
                    <span className="text-2xl font-serif font-bold">€</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#a3b355] hover:bg-[#8f9d4a] text-white py-5 rounded-2xl font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faCalendarAlt} />
                Confirmar Reserva
              </button>
              
              <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed">
                Este precio es una estimación. Al confirmar, contactaremos contigo para formalizar el pago de la fianza.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}