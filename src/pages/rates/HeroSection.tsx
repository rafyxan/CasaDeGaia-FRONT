import heroBg from '../../assets/rates/photo-1588087803910-1574c4436162.png';

export default function HeroSection() {
  return (
    /* Reducimos la altura de 80vh a 40vh (o 50vh) y el min-h de 600px a 300px */
    <section className="relative h-[40vh] min-h-[350px] w-full overflow-hidden flex items-center justify-center text-center">
      
      {/* Imagen de fondo con Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat duration-700"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          /* Mantenemos el desenfoque suave para resaltar el texto */
          filter: 'blur(4px)', 
        }}
      >
        {/* Capa oscura para legibilidad */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-4xl px-4 flex flex-col items-center">
        
        {/* Texto más pequeño: de 7xl a 5xl en escritorio */}
        <h1 className="text-white text-4xl md:text-5xl font-serif mb-4 leading-tight drop-shadow-md">
          Nuestras Tarifas
        </h1>

        {/* Párrafo más compacto: de text-xl a text-base/lg */}
        <p className="text-white/90 text-base md:text-lg font-light max-w-xl leading-relaxed drop-shadow-sm">
          Planes flexibles y transparentes para hacer realidad tu evento soñado.
        </p>

      </div>
    </section>
  );
}