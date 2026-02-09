import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/layout/Footer';
import emailjs from '@emailjs/browser';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReserva } from '../../hooks/useReserva';
import { 
  faArrowLeft, faSun, faSnowflake, faExclamationCircle, faGift, faCheckCircle, faMoon,
  faFileInvoiceDollar, faUser, faEnvelope, faPhone, faCreditCard, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

// --- NUEVOS IMPORTS PARA EL CALENDARIO ---
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
// Importamos el servicio que creamos
import { getFechasOcupadas } from '../../services/api';

registerLocale('es', es);

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enviarReserva, loading } = useReserva();
  
  const packId = searchParams.get('pack') || 'estandar';
  const seasonParam = searchParams.get('season') || 'baja';

  const packNames: { [key: string]: string } = {
    estandar: "Tarifa Estándar - 12h",
    economica: "Tarifa Económica - 8h",
    casa_completa: "Casa Completa - Pernocta",
    premium: "Tarifa Premium - 12h"
  };

  const ranges = {
    alta: { startMonth: 5, endMonth: 8, label: "Junio a Septiembre" },
    baja: { startMonth: 9, endMonth: 4, label: "Octubre a Mayo" }
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
  const [pagoPlazos, setPagoPlazos] = useState(false);

  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({ nombre: '', correo: '', telefono: '' });

  // --- ESTADO PARA FECHAS BLOQUEADAS ---
  const [fechasOcupadas, setFechasOcupadas] = useState<Date[]>([]);
  const [isApiLoading, setIsApiLoading] = useState(true);

  // --- LÓGICA PARA BLOQUEAR MESES FUERA DE TEMPORADA ---
  const getIncludeIntervals = () => {
    const currentYear = new Date().getFullYear();
    const intervals = [];

    if (seasonParam === 'alta') {
      // Junio (5) a Septiembre (8)
      intervals.push({ start: new Date(currentYear, 5, 1), end: new Date(currentYear, 8, 30) });
      intervals.push({ start: new Date(currentYear + 1, 5, 1), end: new Date(currentYear + 1, 8, 30) });
    } else {
      // Octubre (9) a Mayo (4)
      // Rango 1: Enero a Mayo de este año
      intervals.push({ start: new Date(currentYear, 0, 1), end: new Date(currentYear, 4, 31) });
      // Rango 2: Octubre de este año a Mayo del año que viene
      intervals.push({ start: new Date(currentYear, 9, 1), end: new Date(currentYear + 1, 4, 31) });
    }
    return intervals;
  };

  // --- EFECTO CARGA DE BASE DE DATOS ---
  useEffect(() => {
    const cargarDatos = async () => {
      setIsApiLoading(true);
      try {
        // Obtenemos los datos (asumiendo que vienen como strings o Dates)
        const data = await getFechasOcupadas(); 
        
        // Mapeo seguro: si es string lo convierte, si ya es Date lo mantiene
        const processedDates = data.map((d: string | Date) => 
          d instanceof Date ? d : new Date(d + 'T12:00:00')
        );
        
        setFechasOcupadas(processedDates);
      } catch (error) {
        console.error("Error al cargar fechas ocupadas", error);
      } finally {
        setIsApiLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // --- LÓGICA DE VALIDACIÓN ---
  const validarEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const formularioValido = 
    date !== '' && 
    userData.nombre.trim().length >= 3 && 
    validarEmail(userData.correo) && 
    userData.telefono.trim().length >= 9;

  // NUEVA FUNCIÓN ON_DATE_CHANGE PARA DATEPICKER
  const onDateChange = (selectedDate: Date | null) => {
    if (!selectedDate) {
      setDate('');
      return;
    }

    setDateError('');
    // Formatear a YYYY-MM-DD localmente
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    setDate(dateString);
    const dayOfWeek = selectedDate.getDay();
    // Viernes (5), Sábado (6), Domingo (0)
    setIsWeekend(dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0);
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

  const confirmarReservaFinal = async () => {
    const fechaEntradaObj = new Date(date);
    const fechaSalidaObj = new Date(date);
    
    if (packId === 'casa_completa') {
      fechaSalidaObj.setDate(fechaEntradaObj.getDate() + nights);
    }
    const fechaSalidaFormateada = fechaSalidaObj.toISOString().split('T')[0];

    const payload = {
      nombre: userData.nombre,
      correo: userData.correo,
      telefono: userData.telefono,
      tipo_tarifa: packNames[packId],
      fecha_entrada: date,
      fecha_salida: fechaSalidaFormateada,
      hora_entrada: startTime,
      hora_salida: endTime,
      adultos: adults,
      ninos: kids,
      total_personas: adults + kids,
      noches: packId === 'casa_completa' ? nights : 0,
      precio_total: total,
      pago_plazos: pagoPlazos 
    };

    try {
      // 3. Envío al Backend
      // Esta función debe llamar a tu API (ej: http://localhost:5000/api/reservas)
      // El backend recibirá este payload, lo guardará en MySQL y enviará los correos con Nodemailer
      await enviarReserva(payload);

      // 4. Éxito: Cambiamos al paso final (Step 4 es el mensaje de agradecimiento)
      setStep(4); 
      window.scrollTo(0, 0);

    } catch (err) {
      // 5. Gestión de errores
      console.error("Error en el proceso de reserva:", err);
      alert("Error al procesar la reserva: " + err);
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-[#f0f2e8] text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f9f9f6] rounded-full" />
          <div className="relative">
            <div className="w-20 h-20 bg-[#f5f5f0] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#c2c086]/30">
              <FontAwesomeIcon icon={faCheckCircle} className="text-[#7a8a46] text-4xl" />
            </div>
            <h1 className="text-4xl font-serif text-[#7a8a46] mb-4">¡Reserva Solicitada!</h1>
            <p className="text-[#7a8a46]/80 leading-relaxed mb-8">
              Gracias por confiar en <strong>Casa de Gaia</strong>, <span className="text-[#7a8a46] font-bold">{userData.nombre}</span>. 
              Hemos recibido tu solicitud para el día <span className="font-bold">{date}</span>.
            </p>
            <div className="bg-[#fdfdfb] border border-[#f0f2e8] rounded-2xl p-6 mb-10 text-sm text-[#7a8a46]/70">
              <p className="flex items-center justify-center gap-2 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#c2c086]" />
                Te hemos enviado un resumen a {userData.correo}
              </p>
              <p className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-[#c2c086]" />
                Nos pondremos en contacto contigo en las próximas 24h.
              </p>
            </div>
            <button onClick={() => navigate('/')} className="w-full py-4 !bg-[#7a8a46] text-white font-black rounded-2xl shadow-lg hover:!bg-[#8f9d4a] transition-all transform hover:scale-[1.02]">
              VOLVER AL INICIO
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#fdfdfb] py-12 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[1rem] p-12 shadow-2xl border-t-[12px] border-[#7a8a46]">
          <h1 className="text-3xl font-serif text-[#7a8a46] mb-8">Resumen de Reserva</h1>
          <div className="grid grid-cols-2 gap-8 mb-10 border-b pb-8 text-sm text-[#7a8a46]">
            <div className="space-y-2">
              <p className="text-[#c2c086] font-black uppercase text-[10px]">Cliente</p>
              <p className="font-bold">{userData.nombre}</p>
              <p>{userData.correo}</p>
              <p>{userData.telefono}</p>
            </div>
            <div className="space-y-2">
              <p className="text-[#c2c086] font-black uppercase text-[10px]">Detalles del Evento</p>
              <p className="font-bold">{packNames[packId]}</p>
              <p>Día: <span className="font-bold">{date}</span></p>
              <p>Horario: <span className="font-bold">{startTime} - {endTime}</span></p>
              <p>Asistentes: <span className="font-bold">{adults} adultos, {kids} niños</span></p>
              {packId === 'casa_completa' && <p>Estancia: <span className="font-bold">{nights} {nights === 1 ? 'noche' : 'noches'}</span></p>}
              <p>Modalidad: <span className="font-bold">{pagoPlazos ? "Pago a plazos" : "Pago completo"}</span></p>
            </div>
          </div>

          <div className="bg-[#f9f9f6] p-6 rounded-xl flex justify-between items-center mb-8">
            <span className="text-xl font-serif text-[#7a8a46]">Total Alquiler:</span>
            <span className="text-4xl font-bold text-[#a3b355]">{total}€</span>
          </div>

          {/* TABLA DE FIANZAS SEGÚN ASISTENTES */}
          <div className="bg-[#fafaf5] border-2 border-[#c2c086]/30 rounded-2xl overflow-hidden mb-10">
            <div className="bg-[#7a8a46] p-3 text-center">
              <p className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Fianza Reembolsable (Gestión vía WhatsApp)</p>
            </div>
            <div className="p-6">
              <p className="text-[#7a8a46] text-xs mb-4 leading-relaxed">
                Este importe <strong>no se suma al total</strong> en la web; se abonará aparte para cubrir posibles daños y se devolverá íntegramente tras el evento.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-[#c2c086]/20">
                  <span className="text-[10px] font-bold text-[#7a8a46]/60 uppercase tracking-tighter">10 - 29 pers.</span>
                  <span className="text-[#7a8a46] font-black">200€</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-[#c2c086]/20">
                  <span className="text-[10px] font-bold text-[#7a8a46]/60 uppercase tracking-tighter">30 - 49 pers.</span>
                  <span className="text-[#7a8a46] font-black">250€</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-[#c2c086]/20">
                  <span className="text-[10px] font-bold text-[#7a8a46]/60 uppercase tracking-tighter">50 - 69 pers.</span>
                  <span className="text-[#7a8a46] font-black">300€</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-[#c2c086]/20">
                  <span className="text-[10px] font-bold text-[#7a8a46]/60 uppercase tracking-tighter">70 - 100 pers.</span>
                  <span className="text-[#7a8a46] font-black">400€</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#a3b355] font-bold uppercase">
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Devolución garantizada al cumplir las normas</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button disabled={loading} onClick={() => setStep(1)} className="flex-1 py-4 border border-[#c2c086] rounded-xl text-[#c2c086] font-bold hover:bg-gray-50 transition-colors disabled:opacity-50">Corregir</button>
            <button disabled={loading} onClick={confirmarReservaFinal} className="flex-1 py-4 !bg-[#7a8a46] text-white font-bold rounded-xl shadow-lg hover:!bg-[#8f9d4a] transition-colors disabled:!bg-gray-400">
              {loading ? "ENVIANDO..." : "CONFIRMAR RESERVA"}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${seasonParam === 'alta' ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${seasonParam === 'alta' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-tight ${seasonParam === 'alta' ? 'text-orange-700' : 'text-blue-700'}`}>
                      Meses habilitados
                    </p>
                    <p className={`text-sm ${seasonParam === 'alta' ? 'text-orange-600/80' : 'text-blue-600/80'}`}>
                      Para esta tarifa, solo puedes elegir días de <strong>{currentRange.label}</strong>.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-[#c2c086] uppercase mb-2 tracking-widest">
                    1. Fecha del Evento <span className="text-[#a3b355] ml-1">({currentRange.label})</span>
                  </label>
                  
                  <DatePicker
                    selected={date ? new Date(date + 'T12:00:00') : null}
                    onChange={onDateChange}
                    excludeDates={fechasOcupadas}
                    includeDateIntervals={getIncludeIntervals()}
                    minDate={new Date()}
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    placeholderText={isApiLoading ? "Verificando disponibilidad..." : "Busca un día libre"}
                    disabled={isApiLoading}
                    className={`w-full p-4 rounded-xl border-2 ${dateError ? 'border-red-300' : 'border-[#f0f2e8]'} !bg-[#fdfdfb] font-bold text-[#7a8a46] outline-none focus:border-[#7a8a46]`}
                    wrapperClassName="w-full"
                  />
                  
                  {dateError && <p className="text-red-500 text-xs mt-2 font-bold"><FontAwesomeIcon icon={faExclamationCircle} /> {dateError}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f9f9f6] p-6 rounded-3xl border border-[#f0f2e8] text-center">
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-4 tracking-widest">Adultos <span className="text-[#a3b355] ml-1">({currentPrices.adult}€)</span></label>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setAdults(Math.max(10, adults - 1))} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">-</button>
                      <span className="text-3xl font-bold text-[#7a8a46]">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">+</button>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f6] p-6 rounded-3xl border border-[#f0f2e8] text-center">
                    <label className="block text-[10px] font-black text-[#c2c086] uppercase mb-4 tracking-widest">Niños (6-12 años) <span className="text-[#a3b355] ml-1">({currentPrices.kid}€)</span></label>
                    <div className="flex items-center justify-between">
                      <button onClick={() => setKids(Math.max(0, kids - 1))} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">-</button>
                      <span className="text-3xl font-bold text-[#7a8a46]">{kids}</span>
                      <button onClick={() => setKids(kids + 1)} className="w-10 h-10 rounded-full !bg-white shadow-sm text-[#a3b355] font-bold border border-[#f0f2e8]">+</button>
                    </div>
                  </div>
                </div>

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

                <div className="pt-6">
                  <label className="relative flex items-center p-6 rounded-2xl border-2 border-dashed border-[#c2c086]/40 bg-[#fdfdfb] cursor-pointer hover:border-[#7a8a46] transition-all group">
                    <input 
                      type="checkbox" 
                      className="hidden peer" 
                      checked={pagoPlazos}
                      onChange={(e) => setPagoPlazos(e.target.checked)}
                    />
                    <div className="w-6 h-6 rounded border-2 border-[#c2c086] flex items-center justify-center peer-checked:bg-[#7a8a46] peer-checked:border-[#7a8a46] transition-colors">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xs opacity-0 peer-checked:opacity-100" />
                    </div>
                    <div className="ml-4">
                      <span className="block text-sm font-bold text-[#7a8a46] uppercase tracking-tight">Activar pago a plazos</span>
                      <span className="block text-xs text-[#c2c086] font-medium mt-1">
                        Paga una señal ahora y el resto una semana antes del evento.
                      </span>
                    </div>
                    <FontAwesomeIcon icon={faCreditCard} className="ml-auto text-xl text-[#c2c086]/30 group-hover:text-[#7a8a46]/50 transition-colors" />
                  </label>
                </div>

                <div className="pt-8 border-t border-[#f5f5f0] space-y-4">
                  <label className="block text-[11px] font-black text-[#c2c086] uppercase tracking-widest">Información de Contacto</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input className="w-full p-4 rounded-xl border-2 border-[#f0f2e8] text-sm focus:border-[#7a8a46] outline-none transition-colors" placeholder="Nombre completo" value={userData.nombre} onChange={(e) => setUserData({...userData, nombre: e.target.value})} />
                    <input className="w-full p-4 rounded-xl border-2 border-[#f0f2e8] text-sm focus:border-[#7a8a46] outline-none transition-colors" placeholder="Correo electrónico" type="email" value={userData.correo} onChange={(e) => setUserData({...userData, correo: e.target.value})} />
                    <input className="w-full p-4 rounded-xl border-2 border-[#f0f2e8] text-sm focus:border-[#7a8a46] outline-none transition-colors" placeholder="Teléfono" type="tel" value={userData.telefono} onChange={(e) => setUserData({...userData, telefono: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-[#c2c086]/20 sticky top-8">
              <h3 className="text-xl font-serif text-[#7a8a46] mb-6 text-center border-b pb-4">Resumen de Pago</h3>
              <div className="space-y-4 text-sm text-[#7a8a46]">
                <div className="flex justify-between">
                  <span>Asistentes ({adults + kids})</span>
                  <span className="font-bold">{(adults * currentPrices.adult) + (kids * currentPrices.kid)}€</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-700 text-xs bg-green-50 p-2 rounded-lg border border-green-100 italic font-medium">
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
                  <p className="text-[10px] text-[#c2c086] uppercase font-black tracking-widest">Total estimado</p>
                  <div className="flex items-baseline justify-center gap-1 text-[#a3b355]">
                    <span className="text-6xl font-serif font-bold tracking-tighter">{total}</span>
                    <span className="text-2xl font-bold">€</span>
                  </div>
                </div>
              </div>
              <button 
                disabled={!formularioValido} 
                onClick={() => setStep(3)} 
                className={`w-full mt-6 py-5 rounded-3xl font-black text-xl shadow-lg transition-all ${!formularioValido ? '!bg-gray-100 !text-gray-400 cursor-not-allowed' : '!bg-[#7a8a46] !text-white hover:!bg-[#8f9d4a] active:scale-95'}`}
              >
                {formularioValido ? "RESERVAR" : "COMPLETA LOS CAMPOS"}
              </button>

              {/* TEXTO DE CONTACTO AÑADIDO DEBAJO DEL BOTÓN */}
              <div className="mt-6 text-center">
                <p className="text-[#c2c086] text-xs font-medium">
                  ¿Tienes cualquier pregunta?{" "}
                  <Link 
                    to="/contacto" 
                    className="text-[#7a8a46] font-bold underline hover:text-[#8f9d4a] transition-colors"
                  >
                    Contáctanos aquí
                  </Link>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    
  );
}