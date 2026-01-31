import { FaStar } from 'react-icons/fa';
import perfil1 from '../../assets/profile/perfil1.png';
import perfil2 from '../../assets/profile/perfil2.png';
import perfil3 from '../../assets/profile/perfil3.png';

type Props = {}

// Definimos la interfaz para la estructura de una reseña
interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number; // 1-5 estrellas
  comment: string;
}

export default function Reviews({}: Props) {
  // Datos de ejemplo para las reseñas (en una app real, vendrían de una API)
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Patricia R.M',
      avatar: perfil1, // URL de avatar de ejemplo
      rating: 5,
      comment: 'Celebramos la graduación de 4° de la eso y fue todo de maravilla. La casa es una verdadera pasada, Katia nos ayudó en todo y colaboró siempre con nuestras necesidades, todo un acierto.La recomiendo 100% , volveremos seguro',
    },
    {
      id: 2,
      name: 'Nuria Palba Belbe',
      avatar: perfil2, // URL de avatar de ejemplo
      rating: 5,
      comment: 'Un sitio increíble y acogedor, lo que más me ha gustado ha sido la zona de la piscina que para el verano es un sitio top 🔝. Recomendado 100%, además que el trato ha sido muy bueno.',
    },
    {
      id: 3,
      name: 'Ivan Furio',
      avatar: perfil3, // URL de avatar de ejemplo
      rating: 5,
      comment: 'El alojamiento es increíble, muy espacioso. Cuenta con un gran numero de zonas comunes donde realizar actividades si vas en grupo. La piscina es muy bonita y se ve impresionante de noche. Una vez entras aquí dan ganas de no salir nunca mas. Espero volver pronto…',
    },
  ];

  // Colores y estilos aproximados (puedes mover estos a index.css si usas @apply como vimos antes)
  // Por ahora, los dejamos aquí para que veas las clases directas de Tailwind
  const cardBgColor = 'bg-white';
  const textColorPrimary = 'text-[#4a4a4a]'; // Texto oscuro para contenido
  const textColorSecondary = 'text-gray-600'; // Texto para "Hace X tiempo"
  const titleColor = 'text-[#7d8f6d]'; // Color del título "Lo que nuestros huéspedes dicen"
  const starColor = 'text-yellow-400'; // Color de las estrellas
  const buttonBgColor = 'bg-[#a3a380]'; // Color del botón "Ver todas las opiniones en Google"
  const buttonTextColor = 'text-white';
  const borderColor = 'border-gray-200'; // Borde de las tarjetas

  return (
    <section className={`py-16 bg-color-beige ${textColorPrimary}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Título y Subtítulo */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-serif mb-4 ${titleColor}`}>Lo que nuestros huéspedes dicen</h2>
          <p className={`text-lg ${textColorPrimary}`}>Estamos orgullosos de las experiencias que compartimos</p>
        </div>

        {/* Contenedor de las Tarjetas de Reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <div key={review.id} className={`p-6 rounded-xl shadow-lg ${cardBgColor} ${borderColor} border`}>
              {/* Encabezado de la tarjeta (Avatar, Nombre, Estrellas) */}
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? starColor : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Comentario y tiempo hace */}
              <p className={`mb-4 ${textColorPrimary}`}>{review.comment}</p>
              <p className={`text-sm ${textColorSecondary}`}></p>
            </div>
          ))}
        </div>

        {/* Botón "Ver todas las opiniones en Google" */}
        <div className="text-center">
          <a
            href="https://www.google.com/search?sca_esv=7cb5a2c0938f91b5&sxsrf=AE3TifM8hj7MfLDhuJislvfRxdzrELRlqA:1764177402768&q=Casa+de+Gaia+reviews&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5DzyB9xSYp2FCRag5I_mlh_kkRO8SyMh-eSut8ZYuAwCY5le90iS2aN0VBqF5VygwBR6w8%3D&uds=AOm0WdFRYvIbG8WuVt20BADsgGfg7iL45IRlCSKSi5HIM9WAeoHxx6zNbIgsElCWbYr0fV12eKLEmtsJfvpkcyqFErWTunZjiD5Re6A3XB3ZTJ8Pp46RqDw&sa=X&ved=2ahUKEwjSvqb7qJCRAxUmZqQEHdr6CZYQ3PALegQIOBAF&biw=1920&bih=953&dpr=1" // Reemplaza con la URL real de tus reseñas en Google
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${buttonBgColor} ${buttonTextColor} hover:bg-[#8e8e6b]`}
          >
            Ver todas las opiniones en Google
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
        </div>

        {/* Mensaje de error (si lo quieres mantener, aunque en un proyecto real sería dinámico) */}
        {/* <div className="text-center mt-8 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          <p>⚠️ Failed to send a request to the Edge Function</p>
        </div> */}

      </div>
    </section>
  );
}