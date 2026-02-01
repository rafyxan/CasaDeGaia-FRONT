import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faMusic, 
  faGlassCheers, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

export default function ExperienceDetails() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* BLOQUE 1: BARBACOA Y COCINA (Imagen Derecha) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block bg-[#f5f5f0] text-[#a3b355] px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
              Gastronomía
            </div>
            <h3 className="text-4xl font-serif text-title-sage leading-tight">
              Barbacoa Interior: <br /> El corazón de la reunión
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Un espacio cálido y funcional equipado para que no falte nada. Desde nuestra <strong>parrilla interior</strong> (carbón/leña) hasta paelleros eléctricos de varios tamaños. 
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-[#c2c086]" /> Horno de leña
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-[#c2c086]" /> Vinoteca y 2 Neveras
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-[#c2c086]" /> Menaje para 30+ pax
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-[#c2c086]" /> Kit AOVE y Especias
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#f5f5f0] rounded-[2rem] -rotate-2"></div>
              <img 
                src="RUTA_DE_TU_IMAGEN_BARBACOA" 
                alt="Barbacoa Casa de Gaia" 
                className="relative rounded-[2rem] shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: DISCOTECA Y OCIO (Imagen Izquierda) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block bg-[#f5f5f0] text-[#a3b355] px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
              Diversión
            </div>
            <h3 className="text-4xl font-serif text-title-sage leading-tight">
              Tu gente. Tu música. <br /> Tu momento.
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cuando el ambiente sube, estrenamos nuestra <strong>discoteca interior</strong>. Un espacio exclusivo con barra de baile, bola de discoteca e iluminación LED para que la fiesta no pare aunque el tiempo sea caprichoso.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#c2c086]">
                  <FontAwesomeIcon icon={faMusic} />
                </div>
                Altavoz Bluetooth y Karaoke
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#c2c086]">
                  <FontAwesomeIcon icon={faGlassCheers} />
                </div>
                Barra de baile y Chill-out techado
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#f5f5f0] rounded-[2rem] rotate-2"></div>
              <img 
                src="RUTA_DE_TU_IMAGEN_DISCOTECA" 
                alt="Discoteca Casa de Gaia" 
                className="relative rounded-[2rem] shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Cierre: Frase Final */}
        <div className="text-center pt-12 border-t border-gray-100">
          <p className="font-serif text-2xl md:text-3xl text-[#7a8a46] italic">
            "Todo lo que necesitas para tu celebración, en un solo lugar"
          </p>
        </div>
      </div>
    </section>
  );
}