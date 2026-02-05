import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faSun, faSnowflake, faExclamationCircle, faGift, faCheckCircle, faMoon
} from '@fortawesome/free-solid-svg-icons';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const packId = searchParams.get('pack') || 'estandar';
  const seasonParam = searchParams.get('season') || 'baja';

  const packNames: { [key: string]: string } = {
    estandar: "Tarifa Estándar - 12h",
    economica: "Tarifa Económica - 8h",
    casa_completa: "Casa Completa - Pernocta",
    premium: "Tarifa Premium - 12h"
  };

  const ranges = {
    alta: { min: "2026-06-01", max: "2026-09-30", label: "Junio a Septiembre" },
    baja: { min: "2026-10-01", max: "2027-05-31", label: "Octubre a Mayo" }
  };
  const currentRange = seasonParam === 'alta' ? ranges.alta : ranges.baja;

  const [adults, setAdults] = useState(10);
  const [kids, setKids] = useState(0);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('');
  const [nights, setNights] = useState(1);
  const [total, setTotal] = useState(0);
  const [isWeekend, setIsWeekend] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [currentPrices, setCurrentPrices] = useState({ adult: 0, kid: 0, baseCasa: 0 });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected < currentRange.min || selected > currentRange.max) {
      setDateError(`Válido solo en: ${currentRange.label}`);
      setDate('');
    } else {
      setDateError('');
      setDate(selected);
      const selDate = new Date(selected);
      const day = selDate.getDay();
      setIsWeekend(day === 5 || day === 6 || day === 0);
    }
  };

  useEffect(() => {
    let adultPrice = 0;
    let kidPrice = 0;
    let baseCasa = 0;
    let duration = 12;

    if (seasonParam === 'alta') {
      if (packId === 'estandar') { adultPrice = isWeekend ? 35 : 30; kidPrice = 15; duration = 12; }
      if (packId === 'casa_completa') { adultPrice = 35; kidPrice = 15; baseCasa = 450; duration = 24; }
      if (packId === 'premium') { adultPrice = 50; kidPrice = 20; duration = 12; }
    } else {
      if (packId === 'estandar') { adultPrice = 25; kidPrice = 12; duration = 12; }
      if (packId === 'economica') { adultPrice = 18; kidPrice = 9; duration = 8; }
      if (packId === 'casa_completa') { adultPrice = 25; kidPrice = 12; baseCasa = 400; duration = 24; }
    }
    
    const finalDuration = packId !== 'casa_completa' ? duration + 2 : duration;
    setCurrentPrices({ adult: adultPrice, kid: kidPrice, baseCasa });

    const totalPeople = adults + kids;
    let discount = 0;
    if (totalPeople >= 70) discount = 0.20;
    else if (totalPeople >= 50) discount = 0.15;
    else if (totalPeople >= 30) discount = 0.10;
    setDiscountPercent(discount * 100);

    const subtotalPersonas = (adults * adultPrice) + (kids * kidPrice);
    const totalPersonasConDescuento = subtotalPersonas * (1 - discount);

    let totalCostoCasa = 0;
    if (baseCasa > 0) {
      const costoNochesExtra = nights > 1 ? (nights - 1) * (baseCasa * 0.5) : 0;
      totalCostoCasa = baseCasa + costoNochesExtra;
    }

    setTotal(Math.round(totalPersonasConDescuento + totalCostoCasa));

    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = (hours + finalDuration) % 24;
    setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);

  }, [date, adults, kids, nights, startTime, packId, seasonParam, isWeekend]);

  return (
    <section className="min-h-screen bg-[#fdfdfb] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 !bg-[#f5f5f0] text-[#7a8a46] px-6 py-2 rounded-xl font-bold border border-[#c2c086]/30 hover:!bg-white transition-all shadow-sm">
          <FontAwesomeIcon icon={faArrowLeft} /> Cambiar Tarifa
        </button>

        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#c2c086]/20 pb-6">
          <div>
            <span className="text-[#c2c086] text-[10px] font-black uppercase tracking-[0.2em]">Has seleccionado:</span>
            <h1 className="text-4xl font-serif text-[#7a8a46] block">{packNames[packId] || "Tarifa Estándar"}</h1>
          </div>
          <div className="flex items-center gap-2 bg-[#f5f5f0] px-4 py-2 rounded-full border border-[#c2c086]/20">
            <FontAwesomeIcon icon={seasonParam === 'alta' ? faSun : faSnowflake} className={seasonParam === 'alta' ? 'text-orange-400' : 'text-blue-400'} />
            <span className="text-[#7a8a46] font-bold text-sm uppercase tracking-wider">Temporada {seasonParam}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#f0f2e8]">
              <h2 className="text-2xl font-serif text-[#7a8a46] mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-[#c2c086] text-lg" />
                Configura tus detalles
              </h2>

              <div className="space-y-8">
                {/* FECHA */}
                <div>
                  <label className="block text-[11px] font-black text-[#c2c086] uppercase mb-2 tracking-widest">1. Fecha del Evento</label>
                  <input type="date" value={date} min={currentRange.min} max={currentRange.max} onChange={handleDateChange} className="w-full p-4 rounded-xl border-2 border-[#f0f2e8] !bg-[#fdfdfb] font-bold text-[#7a8a46]" />
                </div>

                {/* ASISTENTES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f9f9f6] p-6 rounded-3xl border border-[#f0f2e8] text-center">
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-4 tracking-widest">
                      Adultos <span className="text-[#a3b355] ml-1">({currentPrices.adult}€)</span>
                    </label>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setAdults(Math.max(10, adults - 1))} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">-</button>
                      <span className="text-3xl font-bold text-[#7a8a46]">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">+</button>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f6] p-6 rounded-3xl border border-[#f0f2e8] text-center">
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-4 tracking-widest">
                      Niños (6-12 años) <span className="text-[#a3b355] ml-1">({currentPrices.kid}€)</span>
                    </label>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">-</button>
                      <span className="text-3xl font-bold text-[#7a8a46]">{kids}</span>
                      <button onClick={() => setKids(kids + 1)} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">+</button>
                    </div>
                  </div>
                </div>

                {/* HORAS Y NOCHES */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${packId === 'casa_completa' ? 'lg:grid-cols-3' : ''}`}>
                  <div>
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-2 tracking-widest">Entrada</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-4 rounded-xl border border-[#f0f2e8] font-bold text-[#7a8a46]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-2 tracking-widest">Salida Máx. {packId !== 'casa_completa' && '(+2h Regalo)'}</label>
                    <div className="p-4 rounded-xl !bg-[#f5f5f0] text-[#7a8a46] font-bold text-center text-xl border border-[#c2c086]/20 shadow-inner">{endTime}</div>
                  </div>
                  {packId === 'casa_completa' && (
                    <div>
                      <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-2 tracking-widest text-[#a3b355]">Noches (Dto. 50% extra)</label>
                      <select value={nights} onChange={(e) => setNights(Number(e.target.value))} className="w-full p-4 rounded-xl border-2 border-[#a3b355] font-bold text-[#7a8a46] !bg-white">
                        {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} {n === 1 ? 'noche' : 'noches'}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* PROMOS APLICADAS */}
                <div className="space-y-3">
                  {packId !== 'casa_completa' && (
                    <div className="!bg-[#f0f2e8] p-4 rounded-2xl border border-[#c2c086]/30 flex items-center gap-4 text-[#7a8a46]">
                      <FontAwesomeIcon icon={faGift} className="text-[#a3b355] text-lg" />
                      <p className="text-xs font-bold uppercase tracking-tight">Incluimos +2 horas de cortesía en tu horario de salida.</p>
                    </div>
                  )}
                  {nights > 1 && (
                    <div className="!bg-[#f0f2e8] p-4 rounded-2xl border border-[#a3b355]/30 flex items-center gap-4 text-[#7a8a46]">
                      <FontAwesomeIcon icon={faMoon} className="text-[#a3b355] text-lg" />
                      <p className="text-xs font-bold uppercase tracking-tight">¡Aplicado 50% de descuento en tus noches adicionales!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RESUMEN LATERAL */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#c2c086]/20 sticky top-8">
              <h3 className="text-xl font-serif text-[#7a8a46] mb-6 text-center border-b pb-4">Resumen de Pago</h3>
              
              <div className="space-y-4 text-sm text-[#7a8a46]">
                <div className="flex justify-between">
                  <span>Asistentes ({adults + kids})</span>
                  <span className="font-bold">{(adults * currentPrices.adult) + (kids * currentPrices.kid)}€</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-700 text-xs bg-green-50 p-2 rounded-lg border border-green-100">
                    <span>Dto. Grupo ({discountPercent}%)</span>
                    <span className="font-bold">- {Math.round(((adults * currentPrices.adult) + (kids * currentPrices.kid)) * (discountPercent/100))}€</span>
                  </div>
                )}

                {currentPrices.baseCasa > 0 && (
                  <div className="pt-4 border-t border-dashed border-[#c2c086]/40">
                    <div className="flex justify-between">
                      <span>Alquiler Casa (1ª noche)</span>
                      <span>{currentPrices.baseCasa}€</span>
                    </div>
                    {nights > 1 && (
                      <div className="flex justify-between text-green-700 mt-2 bg-green-50 p-2 rounded-lg border border-green-100 text-xs">
                        <span>{nights - 1} Noches extra (-50%)</span>
                        <span className="font-bold">+ {(nights - 1) * (currentPrices.baseCasa * 0.5)}€</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="pt-6 border-t-2 border-[#f5f5f0] text-center">
                  <p className="text-[10px] text-[#c2c086] uppercase font-black tracking-widest">Total a pagar</p>
                  <div className="flex items-baseline justify-center gap-1 text-[#a3b355]">
                    <span className="text-6xl font-serif font-bold tracking-tighter">{total}</span>
                    <span className="text-2xl font-bold">€</span>
                  </div>
                  <p className="text-[9px] text-[#c2c086] italic mt-2 text-center uppercase">Confirmación sujeta a disponibilidad</p>
                </div>
              </div>

              <button 
                disabled={!date} 
                className={`w-full mt-6 py-5 rounded-3xl font-black text-xl shadow-lg transition-all ${
                  !date 
                  ? '!bg-gray-100 !text-gray-400 cursor-not-allowed shadow-none border border-gray-200' 
                  : '!bg-[#7a8a46] !text-white hover:!bg-[#8f9d4a] active:scale-95'
                }`}
              >
                RESERVAR AHORA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}