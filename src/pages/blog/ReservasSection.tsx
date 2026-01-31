import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import bgFinal from '../../assets/bg-reservas.png';

export default function ReservasSection() {
  return (
    /* Usamos el color beige-light como fondo base de la sección */
    <section className="relative py-24 px-4 overflow-hidden text-center bg-beige-light">
      
      {/* 1. Imagen de fondo que se mueve normal con el scroll */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          backgroundImage: `url(${bgFinal})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

     
      <div 
        className="absolute inset-0 z-1 bg-linear-to-t from-[#f5f5f0] via-[#f5f5f0]/80 to-transparent"
      />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-title-sage mb-8 leading-tight">
          ¿Listo para Crear Recuerdos Inolvidables?
        </h2>
        
        <p className="text-primary-dark/80 text-lg mb-10 leading-relaxed font-light">
          En Casa de Gaia, cada rincón está pensado para hacer de tu evento o estancia una experiencia única. 
          Descubre la magia de nuestros espacios y la calidez de nuestro servicio.
        </p>

        <Link to="/tarifas" className="inline-block">
          <button className="bg-[#c2c086] hover:bg-[#b0ae75] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 mx-auto shadow-lg transition-transform hover:scale-105">
            <FontAwesomeIcon icon={faCalendarCheck} />
            Reservar Ahora
          </button>
        </Link>
      </div>
    </section>
  );
}
