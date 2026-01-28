import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importamos los iconos necesarios de FontAwesome
import { 
  faWandMagicSparkles, 
  faUsers, 
  faSun, 
  faComment, 
  faCalendarDays, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

// 1. Definición de la estructura de los datos para una tarjeta de servicio
interface Service {
  id: number;
  icon: any; // Tipo 'any' para el icono de FontAwesome
  title: string;
  description: string;
}

// 2. Datos de los 6 servicios (fáciles de editar aquí)
const servicesData: Service[] = [
  {
    id: 1,
    icon: faWandMagicSparkles,
    title: 'Bodas Mágicas',
    description: 'Celebra tu amor en un entorno idílico, con espacios versátiles y atención personalizada para un día inolvidable.'
  },
  {
    id: 2,
    icon: faUsers,
    title: 'Retiros y Talleres',
    description: 'Encuentra inspiración y conexión en nuestros espacios tranquilos, perfectos para el crecimiento personal y grupal.'
  },
  {
    id: 3,
    icon: faSun,
    title: 'Eventos Corporativos',
    description: 'Organiza reuniones, presentaciones o team buildings en un ambiente diferente y estimulante que fomenta la creatividad.'
  },
  {
    id: 4,
    icon: faComment,
    title: 'Celebraciones Privadas',
    description: 'Cumpleaños, aniversarios o cualquier ocasión especial. Personalizamos cada detalle para que tu festejo sea único.'
  },
  {
    id: 5,
    icon: faCalendarDays,
    title: 'Alquiler Vacacional',
    description: 'Disfruta de una estancia relajante en nuestra casa rural con todas las comodidades, rodeado de naturaleza y paz.'
  },
  {
    id: 6,
    icon: faStar,
    title: 'Experiencias Exclusivas',
    description: 'Desde catas de vino hasta noches de estrellas, ofrecemos actividades únicas para enriquecer tu visita.'
  }
];


type Props = {}

export default function InfoPreview({}: Props) {
  return (
    // Usamos el mismo fondo beige claro de la web
    <section className="bg-beige-light py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Cabecera de la Sección --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-title-sage mb-6">
            Un Espacio Único Para Cada Ocasión
          </h2>
          <p className="text-primary-dark text-lg max-w-3xl mx-auto leading-relaxed">
            Descubre por qué Casa de Gaia es el lugar perfecto para tus celebraciones, retiros o escapadas. Ofrecemos flexibilidad, belleza natural y todas las comodidades que necesitas.
          </p>
        </div>

        {/* --- Cuadrícula de Tarjetas --- */}
        {/* Usamos grid para 1 columna (móvil), 2 (tablet), y 3 (escritorio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Mapeamos los datos para crear cada tarjeta */}
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-card-white p-8 rounded-xl shadow-card text-center transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Icono Dorado Centrado */}
              <div className="text-4xl text-star-yellow mb-6 flex justify-center">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              
              {/* Título del Servicio */}
              <h3 className="text-2xl font-serif text-title-sage mb-4">
                {service.title}
              </h3>
              
              {/* Descripción */}
              <p className="text-primary-dark leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  )
}