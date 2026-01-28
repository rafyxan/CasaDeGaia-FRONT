import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importa los iconos de Font Awesome para redes sociales
import { 
  faFacebookF, 
  faInstagram, 
  faTiktok, 
  faYoutube, 
  faGoogle 
} from '@fortawesome/free-brands-svg-icons';

type Props = {};

export default function Footer({}: Props) {
    // Colores aproximados basados en la imagen (verde oliva oscuro)
    const textColor = 'text-[#e8e4db]'; // Color de texto claro/beige (para el copyright y texto normal)
    const highlightColor = 'text-white'; // Color más brillante para los iconos y títulos (o usa tu color lima)
    const dividerColor = 'border-t border-[#6d7e5d]'; // Línea divisoria

    // Estructura de enlaces legales (simulando que son de react-router-dom)
    const legalLinks = [
        { name: 'Política de Privacidad', path: '/privacidad' },
        { name: 'Términos y Condiciones', path: '/terminos' },
        { name: 'Política de Cookies', path: '/cookies' },
    ];

    return (
        <footer className={`w-full bg-footer py-12`}>
            {/* Contenedor principal limitado y centrado (max-w-7xl es común) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* SECCIÓN PRINCIPAL DE 3 COLUMNAS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

                    {/* COLUMNA 1: CASA DE GAIA (Información) */}
                    <div className="text-left">
                        <h3 className={`text-3xl font-normal ${highlightColor} mb-4`}>
                            Casa de Gaia
                        </h3>
                        <p className={`text-base ${textColor}`}>
                            Comprometidos con la naturaleza, la sostenibilidad y tu bienestar.
                        </p>
                        <p className={`text-sm ${textColor} opacity-80`}>
                            Tipo de establecimiento: Casa rural<br />
                            Nº inscripción: GV-HHU000493-A
                        </p>
                    </div>

                    {/* COLUMNA 2: SÍGUENOS (Redes Sociales) */}
                    <div className="text-center justify-center">
                        <h3 className={`text-xl font-bold ${highlightColor} mb-4`}>
                            Síguenos
                        </h3>
                        <div className="flex space-x-6 text-2xl text-center justify-center">
                            {/* Los iconos heredan el color del contenedor si no se especifica otro */}
                            <a href="https://www.facebook.com/casadegaia.es" className={`${highlightColor} hover:text-white transition`} aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="https://www.instagram.com/casadegaia.es/" className={`${highlightColor} hover:text-white transition`} aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="https://www.tiktok.com/@casadegaia.es" className={`${highlightColor} hover:text-white transition`} aria-label="TikTok">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a href="https://www.youtube.com/@CasaDeGaia" className={`${highlightColor} hover:text-white transition`} aria-label="Youtube">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a href="https://www.google.com/search?sca_esv=c2417ebeb73254dc&rlz=1C1PNBB_enES938ES938&sxsrf=AHTn8zoAEfz70q1K6ikoB5FxxbzUNaPeEw:1746033320306&kgmid=/g/11vb1h0lh0&q=Casa+De+Gaia&shndl=30&shem=lcuae,lstuoe,uaasie&source=sh/x/loc/uni/m1/1&kgs=16d3c1c3109b776f" className={`${highlightColor} hover:text-white transition`} aria-label="Google">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                        </div>
                    </div>

                    {/* COLUMNA 3: LEGAL */}
                    <div className="text-right">
                        <h3 className={`text-xl font-bold ${highlightColor} mb-4`}>
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    {/* Aquí usarías tu componente Link de react-router-dom si aplica */}
                                    <a href={link.path} className={`text-base ${textColor} hover:text-white transition`}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* DIVISOR Y SECCIÓN DE COPYRIGHT */}
                <div className={`${dividerColor} pt-6 mt-4`}>
                    <p className={`text-center text-sm ${textColor}`}>
                        © 2025 CASA DE GAIA EVENTS, S.L. Todos los derechos reservados.
                    </p>
                </div>

            </div>
        </footer>
    );
}