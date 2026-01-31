import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faVideo } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/Inicio-gaia.png';

type Props = {}

export default function HeroSection({}: Props) {
  const imagePath = backgroundImage; // Ruta de la imagen de fondo

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. Imagen de Fondo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)', // Efecto de desenfoque suave
        }}
      >
        {/* 2. Overlay Oscuro (para que el texto sea legible) */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 3. Contenido (Texto y Botones) */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
          Casa de Gaia: Tu <br /> 
          <span className="italic">Refugio Mágico</span> para Eventos
        </h1>

        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Celebra momentos inolvidables en un entorno natural y exclusivo. 
          Desde bodas de ensueño hasta retiros inspiradores, hacemos realidad tu visión.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Botón Principal (Verde) */}
          <button className="bg-button-sage hover:bg-[#8e8e6b] text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg">
            <FontAwesomeIcon icon={faCalendarCheck} />
            Reservar Ahora
          </button>

          {/* Botón Secundario (Transparente/Blur) */}
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all">
            <FontAwesomeIcon icon={faVideo} />
            Solicitar Visita / Tour Virtual
          </button>
          
        </div>
      </div>

      {/* 4. Decoración Inferior (Opcional - Difuminado hacia abajo) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-beige-light to-transparent"></div>
      
    </section>
  )
}