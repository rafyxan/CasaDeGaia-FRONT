import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faUsers, 
  faArrowLeft, 
  faClock,
  faCheckCircle,
  faTag,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPack = searchParams.get('pack') || 'estandar';

  const [pack, setPack] = useState(initialPack);
  const [adults, setAdults] = useState(10);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('');
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(0);
  const [isWeekend, setIsWeekend] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  const [currentPrices, setCurrentPrices] = useState({ adult: 0, kid: 0 });

  // Configuración de Precios Base Casa
  const PRECIO_BASE_CASA = 450; 

  useEffect(() => {
    if (date) {
      const selectedDate = new Date(date);
      const day = selectedDate.getDay(); 
      setIsWeekend(day === 5 || day === 6 || day === 0);
    }

    if (startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      let duration = (pack === 'casa_completa') ? 24 : 14; 
      const endHours = (hours + duration) % 24;
      setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }

    let adultPrice = 0;
    let kidPrice = 15;

    if (pack === 'premium') {
      adultPrice = 50;
      kidPrice = 20;
    } else {
      adultPrice = isWeekend ? 35 : 30;
      kidPrice = 15;
    }

    setCurrentPrices({ adult: adultPrice, kid: kidPrice });

    // 1. CÁLCULO PRECIO PERSONAS
    let totalPersonasBase = (adults * adultPrice) + (kids * kidPrice);

    // 2. APLICAR DESCUENTO (SÓLO A LAS PERSONAS)
    const totalPeopleCount = adults + kids;
    let discount = 0;
    if (totalPeopleCount >= 70) discount = 0.20;
    else if (totalPeopleCount >= 50) discount = 0.15;
    else if (totalPeopleCount >= 30) discount = 0.10;
    
    setDiscountPercent(discount * 100);
    const totalPersonasConDescuento = totalPersonasBase * (1 - discount);

    // 3. CÁLCULO PRECIO ALOJAMIENTO (NETO, SIN DESCUENTO)
    let totalAlojamiento = 0;
    if (pack === 'casa_completa') {
      const precioNochesExtra = nights > 1 ? (nights - 1) * (PRECIO_BASE_CASA * 0.5) : 0;
      totalAlojamiento = PRECIO_BASE_CASA + precioNochesExtra;
    }

    // 4. TOTAL FINAL
    setTotal(Math.round(totalPersonasConDescuento + totalAlojamiento));

  }, [pack, adults, kids, nights, startTime, date, isWeekend]);

  return (
    <section className="min-h-screen bg-[#fdfdfb] py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-all font-bold"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver a tarifas
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50">
              <h2 className="text-4xl font-serif text-[#7a8a46] mb-8">Configura tu Reserva</h2>
              
              <div className="space-y-8">
                {/* 1. Selección de Pack */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Tu Pack Seleccionado</label>
                  <select 
                    value={pack} 
                    onChange={(e) => setPack(e.target.value)}
                    className="w-full p-5 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#a3b355] outline-none bg-gray-50 font-bold text-gray-700 text-lg shadow-sm appearance-none"
                  >
                    <option value="estandar">Pack Estándar - 12h (+2h gratis)</option>
                    <option value="premium">Pack Premium - 12h (Fijo 50€)</option>
                    <option value="casa_completa">Casa Completa - Pernocta (24h)</option>
                  </select>
                </div>

                {/* 2. Fecha y Tarifas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-serif uppercase tracking-wider">Fecha del Evento</label>
                    <input 
                      type="date" 
                      className="w-full p-4 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#a3b355] bg-white shadow-sm font-medium"
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {date && (
                      <p className={`text-[11px] mt-2 font-black uppercase tracking-wider ${isWeekend ? 'text-orange-500' : 'text-[#a3b355]'}`}>
                         {isWeekend ? 'Tarifa Fin de Semana' : 'Tarifa Entre Semana'}
                      </p>
                    )}
                  </div>

                  <div className="bg-[#fdfdfb] p-4 rounded-2xl border border-dashed border-[#c2c086] flex flex-col justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                      <FontAwesomeIcon icon={faTag} /> Precio por Persona
                    </p>
                    <div className="flex justify-around text-center">
                      <div>
                        <span className="block text-2xl font-serif font-bold text-[#7a8a46]">{currentPrices.adult}€</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Adulto</span>
                      </div>
                      <div className="w-[1px] h-10 bg-gray-200"></div>
                      <div>
                        <span className="block text-2xl font-serif font-bold text-[#7a8a46]">{currentPrices.kid}€</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Niño</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Horarios y Noches */}
                <div className={`grid grid-cols-1 ${pack === 'casa_completa' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-serif uppercase tracking-wider">Hora Inicio</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-4 rounded-xl border border-gray-100 outline-none shadow-sm font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-serif tracking-tight uppercase tracking-wider">Hora Salida Máx.</label>
                    <div className="w-full p-4 rounded-xl bg-[#f5f5f0] text-[#7a8a46] font-black text-center flex items-center justify-center gap-2 text-xl shadow-sm border border-gray-50">
                      {endTime}
                    </div>
                  </div>
                  {pack === 'casa_completa' && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-bold text-gray-700 mb-2 font-serif uppercase tracking-wider">Nº de Noches</label>
                      <select 
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-full p-4 rounded-xl border border-[#a3b355] bg-white shadow-sm font-bold text-[#7a8a46] outline-none"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'noche' : 'noches'}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* 4. Asistentes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-gray-50 p-6 rounded-3xl border border-white shadow-sm">
                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest text-center">Adultos (mín. 10)</label>
                    <div className="flex items-center justify-between px-4">
                      <button onClick={() => setAdults(Math.max(10, adults - 1))} className="w-12 h-12 rounded-full bg-white shadow-md text-2xl font-bold text-[#a3b355] border-none">-</button>
                      <span className="text-4xl font-serif font-bold text-gray-800">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-12 h-12 rounded-full bg-white shadow-md text-2xl font-bold text-[#a3b355] border-none">+</button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-white shadow-sm">
                    <label className="block text-[11px] font-black text-gray-400 uppercase mb-4 tracking-widest text-center">Niños (6-12 años)</label>
                    <div className="flex items-center justify-between px-4">
                      <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-12 h-12 rounded-full bg-white shadow-md text-2xl font-bold text-[#a3b355] border-none">-</button>
                      <span className="text-4xl font-serif font-bold text-gray-800">{kids}</span>
                      <button onClick={() => setKids(kids + 1)} className="w-12 h-12 rounded-full bg-white shadow-md text-2xl font-bold text-[#a3b355] border-none">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN ACTUALIZADO */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#c2c086]/20 sticky top-8">
              <h3 className="text-xl font-serif text-[#7a8a46] mb-6 border-b border-dashed pb-4 italic text-center uppercase tracking-widest">Resumen</h3>
              
              <div className="space-y-4 mb-8">
                {/* Desglose Adultos */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium font-serif">Adultos ({adults} x {currentPrices.adult}€)</span>
                  <span className="font-bold text-gray-700">{adults * currentPrices.adult}€</span>
                </div>

                {/* Desglose Niños */}
                {kids > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium font-serif">Niños ({kids} x {currentPrices.kid}€)</span>
                    <span className="font-bold text-gray-700">{kids * currentPrices.kid}€</span>
                  </div>
                )}

                {/* Línea de Descuento (Solo aplicado a personas) */}
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-600 font-bold bg-green-50 p-3 rounded-xl border border-green-100">
                    <span className="flex items-center gap-1 uppercase text-[10px]">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Dto. Personas {discountPercent}%
                    </span>
                    <span>Aplicado</span>
                  </div>
                )}

                {/* Desglose Pernocta neto */}
                {pack === 'casa_completa' && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-bold font-serif italic tracking-wide">Alojamiento (Precio Neto)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>1ª Noche</span>
                      <span>{PRECIO_BASE_CASA}€</span>
                    </div>
                    {nights > 1 && (
                      <div className="flex justify-between items-center text-xs text-[#7a8a46]">
                        <span>Noches extra ({nights - 1} x 50% dto)</span>
                        <span>{(nights - 1) * (PRECIO_BASE_CASA * 0.5)}€</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-6 border-t-2 border-gray-100 mt-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-1 tracking-widest">Total Estimado</p>
                  <div className="flex items-baseline justify-center gap-1 text-[#a3b355]">
                    <span className="text-7xl font-serif font-bold tracking-tighter">{total}</span>
                    <span className="text-3xl font-serif font-bold">€</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xl shadow-xl hover:bg-gray-900 transition-all active:scale-95 flex items-center justify-center gap-3">
                <FontAwesomeIcon icon={faCalendarAlt} />
                Confirmar Reserva
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}