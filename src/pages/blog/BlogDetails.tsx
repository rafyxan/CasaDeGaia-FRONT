import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
// 1. Importa las imágenes necesarias
import blogImg1 from '../../assets/img/54fcf8cfeb7d19b0569ece05ac176f83.png';
import blogImg2 from '../../assets/img/4714a654d8fb6a58dfa09c7d664d7374.png';
import blogImg3 from '../../assets/img/a93d8a306303550ed90d28e804e997d1.png';
import imgInterior1 from '../../assets/blog/photo-1548618699-7e3e8d7780b4.png';
import imgInterior2 from '../../assets/blog/photo-1618106494793-5bc98fc8e4c2.png';
import imgInterior3 from '../../assets/blog/photo-1466837897943-4061ba57b740.png';

export const blogPosts = [
  {
    id: 1,
    category: 'INSPIRACIÓN',
    title: 'Bienvenidos a Casa de Gaia: Un Sueño Hecho Realidad',
    date: '1 de mayo de 2025',
    author: 'El Equipo de Casa de Gaia',
    mainImage: blogImg1,
    content: (
      <>
        <p>En el corazón de Mutxamel, Alicante, nace <strong>Casa de Gaia</strong>, un proyecto impulsado por la pasión de crear experiencias inolvidables. Desde sus inicios, nuestra visión ha sido fusionar la serenidad del diseño balinés con la calidez de la hospitalidad mediterránea, ofreciendo un refugio único para celebraciones y momentos especiales.</p>
        <p>La inspiración detrás de Casa de Gaia proviene de los viajes y el amor por la naturaleza y la arquitectura que evoca paz. Queríamos un lugar donde cada detalle contara una historia, donde los jardines exuberantes y los espacios cuidadosamente decorados invitaran a la desconexión y al disfrute.</p>
        <h2 className="text-2xl font-serif text-title-sage">Nuestra Filosofía</h2>
        <p>Creemos en la magia de los pequeños detalles y en el poder de un entorno hermoso para elevar cualquier ocasión. Ya sea una boda íntima, una fiesta vibrante o un retiro de bienestar, nuestro objetivo es proporcionar el lienzo perfecto para tus recuerdos más preciados.</p>
        <img src={imgInterior1} className="rounded-2xl w-full" alt="Interior Gaia" />
        <p className="italic text-center">Te invitamos a explorar Casa de Gaia, a sentir su energía y a imaginar las posibilidades. Estamos emocionados de compartir este sueño contigo y de ayudarte a crear momentos que perduren para siempre.</p>
      </>
    )
  },
  {
    id: 2,
    category: 'CONSEJOS',
    title: '5 Ideas de Decoración Balinesa para tu Próximo Evento',
    date: '15 de abril de 2025',
    author: 'Ana Martínez',
    mainImage: blogImg2,
    content: (
      <>
        <p>El encanto del estilo balinés reside en su capacidad para crear atmósferas de calma y conexión con la naturaleza. Si buscas una temática original y sofisticada para tu evento, aquí te dejamos cinco ideas inspiradoras:</p>
        <ul className="list-decimal pl-5 space-y-4">
          <li><strong>Flores Exóticas y Hojas Verdes:</strong> Utiliza frangipanis, orquídeas, hojas de palma y bambú para centros de mesa.</li>
          <li><strong>Iluminación Cálida y Velas:</strong> Farolillos de papel y guirnaldas de luces crearán un ambiente íntimo.</li>
          <li><strong>Textiles Naturales:</strong> Opta por lino, algodón y sedas en tonos neutros o batik.</li>
          <li><strong>Elementos de Agua:</strong> Pequeñas fuentes o cuencos con agua y flores flotantes.</li>
          <li><strong>Mobiliario de Madera y Ratán:</strong> Elige muebles de teca o ratán para reforzar la estética artesanal.</li>
        </ul>
        <img src={imgInterior2} className="rounded-2xl w-full" alt="Interior Gaia2" />
        <p>En Casa de Gaia, podemos ayudarte a integrar estos elementos para que tu evento tenga ese toque balinés distintivo.</p>
      </>
    )
  },
  {
    id: 3,
    category: 'EVENTOS',
    title: 'Organiza tu Retiro de Bienestar en un Entorno Único',
    date: '28 de marzo de 2025',
    author: 'Carlos Ruiz',
    mainImage: blogImg3,
    content: (
      <>
        <p>Si estás buscando el lugar ideal para tu próximo retiro de yoga, meditación o bienestar, Casa de Gaia te ofrece un santuario de paz en Mutxamel. Nuestros espacios están diseñados para fomentar la introspección.</p>
        <h2 className="text-2xl font-serif text-title-sage">Instalaciones y Servicios para Retiros</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Amplios jardines para prácticas al aire libre.</li>
          <li>Salón interior versátil para sesiones grupales.</li>
          <li>Piscina y zonas de descanso para la relajación.</li>
          <li>Posibilidad de alojamiento para grupos (hasta 16 personas).</li>
          <li>Opciones de catering saludable adaptado.</li>
        </ul>
        <img src={imgInterior3} className="rounded-2xl w-full" alt="Interior Gaia3" />
        <p>Creemos que el entorno es fundamental para el éxito de un retiro. En Casa de Gaia encontrarás la inspiración necesaria para una experiencia transformadora.</p>
      </>
    )
  }
];

export default function BlogDetails() {
  return (
    <main className="bg-beige-light min-h-screen py-12 px-4">
      {/* Ajustado max-w-7xl para que el grid tenga más espacio a lo ancho */}
      <div className="max-w-7xl mx-auto">
        
        {/* Contenedor Grid: 1 columna en móvil, 3 en pantallas grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-4xl shadow-sm p-6 md:p-8 flex flex-col h-full">
              
              {/* Header del Post: Etiquetas más pequeñas */}
              <div className="flex items-center gap-2 mb-3">
                <FontAwesomeIcon icon={faTag} className="text-[#c2c086] text-xs" />
                <span className="text-[10px] font-bold tracking-widest text-secondary-muted uppercase">
                  {post.category}
                </span>
              </div>

              {/* Título: Reducido de 4xl/5xl a 2xl para que quepa en la columna */}
              <h1 className="text-2xl font-serif text-title-sage mb-4 leading-tight min-h-14">
                {post.title}
              </h1>

              {/* Meta: Texto más pequeño y compacto */}
              <div className="flex flex-wrap gap-4 text-secondary-muted text-[11px] mb-6">
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCalendar} className="opacity-70" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faUser} className="opacity-70" /> {post.author}
                </span>
              </div>

              {/* Imagen Principal: Margen inferior reducido */}
              <div className="rounded-2xl overflow-hidden mb-6 shadow-sm">
                <img src={post.mainImage} alt={post.title} className="w-full h-48 object-cover" />
              </div>

              {/* Cuerpo del Artículo: Tamaño de texto reducido a base (16px) o sm (14px) */}
              <div className="space-y-4 text-primary-dark leading-relaxed text-sm font-light grow">
                {post.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
