import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// 1. Importa las imágenes necesarias
import blogImg1 from '../../assets/img/54fcf8cfeb7d19b0569ece05ac176f83.png';
import blogImg2 from '../../assets/img/4714a654d8fb6a58dfa09c7d664d7374.png';
import blogImg3 from '../../assets/img/a93d8a306303550ed90d28e804e997d1.png';

const blogPosts = [
  {
    id: 1,
    category: 'INSPIRACIÓN',
    title: 'Bienvenidos a Casa de Gaia: Un Sueño Hecho Realidad',
    excerpt: 'Descubre la historia detrás de Casa de Gaia, nuestra inspiración y lo que esperamos ofrecerte...',
    image: blogImg1,
  },
  {
    id: 2,
    category: 'CONSEJOS',
    title: '5 Ideas de Decoración Balinesa para tu Próximo Evento',
    excerpt: 'El estilo balinés es sinónimo de serenidad y exotismo. Te damos algunas ideas para incorporarlo...',
    image: blogImg2,
  },
  {
    id: 3,
    category: 'EVENTOS',
    title: 'Organiza tu Retiro de Bienestar en un Entorno Único',
    excerpt: 'Casa de Gaia ofrece el ambiente perfecto para retiros de yoga, meditación y crecimiento personal...',
    image: blogImg3,
  }
];

type Props = {}

export default function BlogPreview({}: Props) {
  return (
    <section className="bg-beige-light py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-title-sage mb-4">
            Desde Nuestro Blog
          </h2>
          <p className="text-secondary-muted italic">
            Artículos recientes con inspiración, consejos y las últimas novedades de Casa de Gaia.
          </p>
        </div>

        {/* Grid de Tarjetas del Blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-card-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Imagen del post */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <FontAwesomeIcon icon={faTag} className="text-star-yellow text-sm" />
                  <span className="text-xs font-bold tracking-widest text-secondary-muted uppercase bg-beige-light px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-title-sage mb-4 leading-tight">
                  {post.title}
                </h3>

                <p className="text-primary-dark text-sm mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <a 
                  href="/blog" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#c2c086] hover:text-[#b0ae75] transition-colors"
                >
                  Leer Más <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}