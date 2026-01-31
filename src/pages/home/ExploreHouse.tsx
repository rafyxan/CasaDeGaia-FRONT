import { useState } from 'react';

// 1. Importa tus imágenes de la carpeta assets/img
import img1 from '../../assets/img/1bf95a57caef14877b4ea3ab897b49ff.png'; 
import img2 from '../../assets/img/27fd9c00e7b348525588e720b284e205.png';
import img3 from '../../assets/img/36242d51c1b15b9ca36c83dae53f14e2.png';
import img4 from '../../assets/img/43a1d776ba201419f4dc9c6beac489fe.png';
import img5 from '../../assets/img/4714a654d8fb6a58dfa09c7d664d7374.png';
import img6 from '../../assets/img/48999b0683e5dc0383619e6c76952fb0.png';
import img7 from '../../assets/img/82423cd1fb393b28381674d6cf90a2f3.png';
import img8 from '../../assets/img/9b6479985806178d197088a5367fa948.png';
import img9 from '../../assets/img/a93d8a306303550ed90d28e804e997d1.png';
import img10 from '../../assets/img/c7fdff74c3777aef6bf1d2a6ebd34bf8.png';
import img11 from '../../assets/img/ee63b9f6244b556c327a03632de15644.png';
import img12 from '../../assets/img/f318395154f076577c348da00e855635.png';
import img13 from '../../assets/img/f34fd9a1150c022e5a5fc6d3e5a2ccb3.png';
import img14 from '../../assets/img/54fcf8cfeb7d19b0569ece05ac176f83.png';



// 1. Definición de las imágenes (Sustituye por tus rutas reales en /assets/)
const galleryImages = [
  { id: 1, src: img1, alt: 'Piscina Gaia' },
  { id: 12, src: img12, alt: 'Terraza Gaia' },
  { id: 3, src: img3, alt: 'Exterior' },
  { id: 7, src: img7, alt: 'Jardín' },
  { id: 5, src: img5, alt: 'Sala de Estar' },
  { id: 6, src: img6, alt: 'Comedor' },
  { id: 4, src: img4, alt: 'Cocina' },
  { id: 8, src: img8, alt: 'Habitación Doble' },
  { id: 9, src: img9, alt: 'Baño' },
  { id: 10, src: img10, alt: 'Vista Nocturna' },
  { id: 11, src: img11, alt: 'Detalle Decorativo' },
  { id: 2, src: img2, alt: 'Área de Lectura' },
  { id: 13, src: img13, alt: 'Entrada Principal' },
  { id: 14, src: img14, alt: 'Jardines Nocturnos' },
];
type Props = {}

export default function ExploreHouse({}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Cortamos de 0 a 4 para mostrar la primera fila completa
  const displayedImages = isExpanded ? galleryImages : galleryImages.slice(0, 4);

  return (
    <section className="bg-beige-light py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto"> {/* Aumentado max-w para que quepan bien las 4 fotos */}
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-title-sage mb-4">
            Explora Casa de Gaia
          </h2>
          <p className="text-primary-dark text-lg italic max-w-2xl mx-auto">
            Un vistazo a la belleza y el encanto que nos rodea en nuestros espacios.
          </p>
        </div>

        {/* --- Grid de Imágenes Ajustado --- */}
        {/* lg:grid-cols-4 para tener 4 columnas en escritorio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {displayedImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-xl shadow-md aspect-square group animate-fadeIn"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-button-sage hover:bg-[#8e8e6b] text-white px-10 py-4 rounded-lg font-bold transition-all shadow-md tracking-wide"
          >
            {isExpanded ? 'Ver Menos' : 'Ver Galería Completa'}
          </button>
        </div>

      </div>
    </section>
  )
}