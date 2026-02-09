import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faMoon, 
  faStar, 
  faCheck, 
  faUsers, 
  faUtensils,
  faSun,
  faSnowflake,
  faExclamationTriangle,
  faPercentage
} from '@fortawesome/free-solid-svg-icons';

export default function RatesSection() {
  const [temporada, setTemporada] = useState('baja'); 

  const planesAlta = [
    {
      id: "estandar",
      titulo: "Tarifa Estándar",
      etiqueta: "La más reservada",
      subtitulo: "Disfruta del día y alarga la noche sin pernocta.",
      precio: "35€",
      detallePrecio: "Adultos (30€ Lun-Jue)",
      infantil: "15€ (6-12 años) / <5 gratis",
      icono: faClock,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-[#a3b355] hover:bg-[#8f9d4a]",
      caracteristicas: ["12 Horas (+2H regalo)", "Hasta las 07:00", "Exclusividad total", "Discoteca Interior", "Piscina y Exterior", "Barbacoa equipada"],
      destacado: false
    },
    {
      id: "casa_completa",
      titulo: "Casa Completa",
      etiqueta: "Con pernocta",
      subtitulo: "Para celebrar sin prisas y despertar juntos.",
      precio: "450€",
      detallePrecio: "Base Casa + 35€/adulto",
      infantil: "15€ (6-12 años) / <5 gratis",
      icono: faMoon,
      colorIcono: "text-[#c2c086]",
      colorBoton: "bg-[#c2c086] hover:bg-[#b0ae75]",
      caracteristicas: ["Estancia 24 Horas", "Alojamiento incluido", "50% Dto. 2ª noche", "Acceso total 24h", "Kit de cortesía", "Opción Late Check-out"],
      destacado: true
    },
    {
      id: "premium",
      titulo: "Pack Premium",
      etiqueta: "Todo Incluido",
      subtitulo: "Llegar y tenerlo todo listo. Sin preocupaciones.",
      precio: "50€",
      detallePrecio: "Adultos por persona",
      infantil: "20€ / <5 años gratis",
      icono: faStar,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-[#a3b355] hover:bg-[#8f9d4a]",
      caracteristicas: ["12 Horas (+2H regalo)", "Decoración temática", "Montaje de mesas", "Limpieza final incl.", "Equipamiento Pro", "Karaoke y Proyector"],
      destacado: false
    }
  ];

  const planesBaja = [
    {
      id: "estandar",
      titulo: "Tarifa Estándar",
      etiqueta: "Ideal Eventos",
      subtitulo: "Celebraciones con todo el tiempo del mundo.",
      precio: "25€",
      detallePrecio: "Adultos por persona",
      infantil: "12€ (6-12 años) / <5 gratis",
      icono: faClock,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-[#a3b355] hover:bg-[#8f9d4a]",
      caracteristicas: ["12 Horas (+2H regalo)", "Horario flexible", "Alquiler exclusivo", "Discoteca Interior", "Zona exterior", "Barbacoa equipada"],
      destacado: false
    },
    {
      id: "economica",
      titulo: "Tarifa Económica",
      etiqueta: "Novedad Invierno",
      subtitulo: "Celebraciones cortas o encuentros familiares.",
      precio: "18€",
      detallePrecio: "Adultos (8 Horas)",
      infantil: "9€ (6-12 años) / <5 gratis",
      icono: faUsers,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-gray-800 hover:bg-black",
      caracteristicas: ["8 Horas (+2H regalo)", "Ideal comidas familiares", "Acceso completo a zonas", "Discoteca Interior", "Barbacoa y Menaje", "Exclusividad total"],
      destacado: false
    },
    {
      id: "casa_completa",
      titulo: "Casa Completa",
      etiqueta: "Escapada Relax",
      subtitulo: "Vive la magia de Casa de Gaia en invierno.",
      precio: "400€",
      detallePrecio: "Base Casa + 25€/adulto",
      infantil: "12€ (6-12 años) / <5 gratis",
      icono: faMoon,
      colorIcono: "text-[#c2c086]",
      colorBoton: "bg-[#c2c086] hover:bg-[#b0ae75]",
      caracteristicas: ["Estancia 24 Horas", "50% Dto. 2ª noche", "Alojamiento incluido", "Late Check-out opcional", "Café y tés de cortesía", "Acceso total 24h"],
      destacado: true
    }
  ];

  const planesMostrados = temporada === 'alta' ? planesAlta : planesBaja;

  return (
    <section className="py-20 px-4 bg-[#fdfdfb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 font-bold text-2xl">Selecciona la temporada de tu evento para actualizar los precios.</p>
          
          {/* SELECTOR DE TEMPORADA - ESTILO BLANCO MINIMALISTA */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
  {/* Temporada Baja */}
  <button 
    onClick={() => setTemporada('baja')}
    className={`group p-6 rounded-4xl border-2 transition-all duration-300 text-left flex items-center gap-6 ${
      temporada === 'baja' 
      ? 'border-[#c2c086] bg-[#f5f5f0]! shadow-xl scale-105 z-10' 
      : 'border-[#f0f2e8] bg-white! shadow-sm hover:shadow-md hover:border-[#c2c086]/50'
    }`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
      temporada === 'baja' 
      ? 'bg-white! text-[#7a8a46]' 
      : 'bg-[#fdfdfb]! text-[#c2c086]'
    }`}>
      <FontAwesomeIcon icon={faSnowflake} className="text-xl" />
    </div>
    <div>
      <h4 className={`font-bold text-base uppercase tracking-wider mb-1 ${
        temporada === 'baja' ? 'text-[#7a8a46]' : 'text-[#a3b355]' 
      }`}>
        Temporada Baja
      </h4>
      <p className={`text-xs font-bold uppercase italic ${
        temporada === 'baja' ? 'text-[#a3b355]' : 'text-[#c2c086]'
      }`}>
        1 Octubre — 31 Mayo
      </p>
    </div>
  </button>

  {/* Temporada Alta */}
  <button 
    onClick={() => setTemporada('alta')}
    className={`group p-6 rounded-4xl border-2 transition-all duration-300 text-left flex items-center gap-6 ${
      temporada === 'alta' 
      ? 'border-[#a3b355] bg-[#f5f5f0]! shadow-xl scale-105 z-10' 
      : 'border-[#f0f2e8] bg-white! shadow-sm hover:shadow-md hover:border-[#a3b355]/50'
    }`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${
      temporada === 'alta' 
      ? 'bg-white! text-orange-400' 
      : 'bg-[#fdfdfb]! text-[#c2c086]'
    }`}>
      <FontAwesomeIcon icon={faSun} className="text-xl" />
    </div>
    <div>
      <h4 className={`font-bold text-base uppercase tracking-wider mb-1 ${
        temporada === 'alta' ? 'text-[#7a8a46]' : 'text-[#a3b355]'
      }`}>
        Temporada Alta
      </h4>
      <p className={`text-xs font-bold uppercase italic ${
        temporada === 'alta' ? 'text-orange-600' : 'text-[#c2c086]'
      }`}>
        1 Junio — 30 Septiembre
      </p>
    </div>
  </button>
</div>

          {/* BANNER DE DESCUENTOS - TONOS CREMA Y BLANCO */}
          <div className="max-w-2xl mx-auto bg-[#f9f9f6] border border-gray-100 rounded-4xl p-6 mb-16 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
                <div className="text-[#c2c086] text-2xl">
                  <FontAwesomeIcon icon={faPercentage} />
                </div>
                <div className="text-left">
                  <h5 className="font-serif text-lg text-[#7a8a46]">Descuentos de Grupo</h5>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Aplicados al precio/persona</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                {[
                  { pax: "+30", dto: "10%" },
                  { pax: "+50", dto: "15%" },
                  { pax: "+70", dto: "20%" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white px-4 py-2 rounded-2xl border border-gray-50 shadow-sm text-center min-w-[70px]">
                    <p className="text-[10px] font-black text-gray-400 uppercase">{item.pax} pax</p>
                    <p className="text-lg font-serif text-[#a3b355]">{item.dto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Malla de planes dinámicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {planesMostrados.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-[2.5rem] p-8 shadow-xl border transition-all duration-500 flex flex-col ${
                plan.destacado 
                  ? 'bg-white border-[#c2c086] md:scale-105 z-10 ring-8 ring-[#c2c086]/5' 
                  : 'bg-white border-gray-100'
              }`}
            >
              {plan.etiqueta && (
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-md ${plan.destacado ? 'bg-[#7a8a46]' : 'bg-[#c2c086]'}`}>
                  {plan.etiqueta}
                </span>
              )}

              <div className={`text-3xl mb-6 text-center ${plan.colorIcono}`}>
                <FontAwesomeIcon icon={plan.icono} />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-[#7a8a46] mb-2">{plan.titulo}</h3>
                <p className="text-xs text-gray-500 min-h-8">{plan.subtitulo}</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl font-serif text-[#a3b355] mb-1">
                  {plan.precio}
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                  {plan.detallePrecio}
                </p>
                <p className="text-[11px] text-[#c2c086] mt-2 font-medium italic">
                  Infantil: {plan.infantil}
                </p>
              </div>

              <ul className="space-y-3 mb-8 grow">
                {plan.caracteristicas.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-gray-600">
                    <FontAwesomeIcon icon={faCheck} className="text-[#a3b355] mt-1 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={`/reservar?pack=${plan.id}&season=${temporada}`} 
                className={`w-full py-5 rounded-3xl text-white font-black text-center transition-all transform active:scale-95 shadow-xl uppercase tracking-widest text-sm ${plan.colorBoton}`}
              >
                Reservar Ahora
              </Link>
            </div>
          ))}
        </div>

        {/* INFO ADICIONAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex gap-5">
            <div className="text-[#c2c086] text-2xl"><FontAwesomeIcon icon={faUtensils} /></div>
            <div>
              <h4 className="font-serif text-xl text-[#7a8a46] mb-2 text-title-sage">Barbacoa Interior</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Totalmente equipada: paelleros, horno de leña y menaje completo. 
                Perfecta para reuniones en cualquier época del año.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex gap-5 border-l-4 border-l-orange-200">
            <div className="text-orange-400 text-2xl"><FontAwesomeIcon icon={faExclamationTriangle} /></div>
            <div>
              <h4 className="font-serif text-xl text-orange-700 mb-2 text-title-sage">Días Especiales</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Precios variables en <strong>festivos y vísperas</strong>. 
                El sistema aplicará la tarifa de fin de semana para asegurar tu fecha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}