import { Link } from 'react-router-dom'; // 1. Importamos Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faMoon, 
  faStar, 
  faCheck, 
  faUsers, 
  faMusic, 
  faUtensils 
} from '@fortawesome/free-solid-svg-icons';

export default function RatesSection() {
  const planes = [
    {
      id: "estandar", // 2. Añadimos ID para el formulario
      titulo: "Tarifa Estándar",
      etiqueta: "La más reservada",
      subtitulo: "Disfruta del día y alarga la noche sin pernocta.",
      precio: "35€",
      detallePrecio: "Adultos (30€ Lun-Jue)",
      infantil: "15€ (6-12 años) / <5 gratis",
      icono: faClock,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-[#a3b355] hover:bg-[#8f9d4a]",
      caracteristicas: [
        "12 Horas (+2H extra de regalo)",
        "Horario flexible hasta las 07:00",
        "Alquiler exclusivo todo el espacio",
        "Acceso a Discoteca Interior",
        "Zona exterior completa y Piscina",
        "Barbacoa interior equipada"
      ],
      destacado: false
    },
    {
      id: "casa_completa", // 2. Añadimos ID
      titulo: "Casa Completa",
      etiqueta: "Opción con pernocta",
      subtitulo: "Para celebrar sin prisas y despertar juntos.",
      precio: "450€",
      detallePrecio: "+35€ (o 30€) por persona",
      infantil: "15€ (6-12 años) / <5 gratis",
      icono: faMoon,
      colorIcono: "text-[#c2c086]",
      colorBoton: "bg-[#c2c086] hover:bg-[#b0ae75]",
      caracteristicas: [
        "Estancia 24 Horas (desde las 12:00)",
        "Alojamiento incluido",
        "50% Dto. en segundas noches",
        "Acceso total 24h a todas las zonas",
        "Kit de cortesía en baños",
        "Opción Late Check-out disponible"
      ],
      destacado: true
    },
    {
      id: "premium", // 2. Añadimos ID
      titulo: "Pack Premium",
      etiqueta: "La más completa",
      subtitulo: "Llegar y tenerlo todo listo. Sin preocupaciones.",
      precio: "50€",
      detallePrecio: "Adultos por persona",
      infantil: "20€ / <5 años gratis",
      icono: faStar,
      colorIcono: "text-[#a3b355]",
      colorBoton: "bg-[#a3b355] hover:bg-[#8f9d4a]",
      caracteristicas: [
        "12 Horas (+2H extra de regalo)",
        "Decoración temática preparada",
        "Montaje de mesas y mantelería",
        "Limpieza final incluida",
        "Todo el equipamiento Premium",
        "Discoteca, Karaoke y Proyector"
      ],
      destacado: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#fdfdfb]">
      <div className="max-w-7xl mx-auto">
        
        {/* CABECERA DE SECCIÓN */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-title-sage mb-6">Nuestras Tarifas</h2>
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Todas nuestras tarifas incluyen el uso completo de la zona exterior (piscina, camas balinesas, escenario) 
            y nuestra <strong>nueva discoteca interior</strong> con barra, luces y sonido.
          </p>
          
          <div className="mt-8 inline-flex flex-wrap justify-center gap-4 bg-[#f5f5f0] p-4 rounded-2xl border border-[#c2c086]/30 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#7a8a46]">
              <FontAwesomeIcon icon={faUsers} />
              <span>Dtos. Grupos Grandes:</span>
            </div>
            <span className="text-xs bg-white px-3 py-1 rounded-full border border-[#c2c086]">-10% (30-49 pax)</span>
            <span className="text-xs bg-white px-3 py-1 rounded-full border border-[#c2c086]">-15% (50-69 pax)</span>
            <span className="text-xs bg-white px-3 py-1 rounded-full border border-[#c2c086]">-20% (+70 pax)</span>
          </div>
        </div>

        {/* GRID DE PLANES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {planes.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-[2.5rem] p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl flex flex-col ${
                plan.destacado 
                  ? 'bg-[#f5f5f0] border-[#c2c086] md:scale-105 z-10' 
                  : 'bg-white border-gray-100'
              }`}
            >
              {plan.etiqueta && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c2c086] text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
                  {plan.etiqueta}
                </span>
              )}

              <div className={`text-3xl mb-6 text-center ${plan.colorIcono}`}>
                <FontAwesomeIcon icon={plan.icono} />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif text-title-sage mb-2">{plan.titulo}</h3>
                <p className="text-xs text-gray-500 min-h-[32px]">{plan.subtitulo}</p>
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

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.caracteristicas.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-gray-600">
                    <FontAwesomeIcon icon={faCheck} className="text-[#a3b355] mt-1 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* 3. BOTÓN CON ENLACE DINÁMICO */}
              <Link 
                to={`/reservar?pack=${plan.id}`} 
                className={`w-full py-4 rounded-2xl text-white font-bold text-center transition-all transform active:scale-95 shadow-md ${plan.colorBoton}`}
              >
                Reservar Ahora
              </Link>
            </div>
          ))}
        </div>

        {/* INFO ADICIONAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex gap-5">
            <div className="text-[#c2c086] text-2xl"><FontAwesomeIcon icon={faUtensils} /></div>
            <div>
              <h4 className="font-serif text-xl text-title-sage mb-2">Barbacoa Interior</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Totalmente equipada: paelleros, horno de leña, vinoteca y menaje completo para 30 personas. 
                Incluye café, tés y kit de bienvenida con AOVE.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex gap-5">
            <div className="text-[#c2c086] text-2xl"><FontAwesomeIcon icon={faMusic} /></div>
            <div>
              <h4 className="font-serif text-xl text-title-sage mb-2">Novedad: Discoteca</h4>
              <p className="text-sm text-gray-600 leading-snug">
                Barra de baile, bola de discoteca y altavoz Bluetooth profesional. 
                El complemento perfecto para cuando el cuerpo pide seguir la fiesta a cubierto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}