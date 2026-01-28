import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo-casa-de-gaia.png'; // Asegúrate de la ruta correcta

// 🌟 Importaciones de Font Awesome y el tipo IconDefinition
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUsers, faTag, faBookOpen, faEnvelope, type IconDefinition 
} from '@fortawesome/free-solid-svg-icons';

// --- CAMBIO 1: INTERFAZ DE TYPESCRIPT ---
// Añadimos la propiedad 'icon'
interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition; 
}

// --- CAMBIO 2: DEFINICIÓN DE ENLACES CON ICONOS ---
const navLinks: NavLink[] = [
  { name: 'Inicio', path: '/', icon: faHome },
  { name: 'Nosotros', path: '/nosotros', icon: faUsers },
  { name: 'Tarifas', path: '/tarifas', icon: faTag },
  { name: 'Blog', path: '/blog', icon: faBookOpen },
  { name: 'Contacto', path: '/contacto', icon: faEnvelope },
];

const Navbar: React.FC = () => {
  // Los colores se mantienen tal cual están en tu código original
  
  return (
    <header className='bg-amber-50 shadow-sm sticky top-0 z-50'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
      {/* Añadido justify-between para distribuir el logo y la navegación */}
      <div className="flex items-center h-20"> 
          
          {/* 1. Logo */}
          <div className="mr-70"> 
            <Link to="/">
              <img src={logoImage} alt="Logo Casa de Gaia" className="h-12 w-auto" />
            </Link>
          </div>
          
          {/* 2. Navegación */}
          <nav className="flex-1"> {/* Ajustado a justify-end para que no esté pegado al logo */}
            <div className="mr-4 flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  // Añadidas clases 'flex items-center space-x-2' para alinear el icono y el texto
                  className="mr-13 text-lime-600 hover:text-lime-800 transition duration-150 ease-in-out font-bold text-lg flex items-center space-x-2"
                >
                  {/* --- CAMBIO 3: RENDERIZAR EL ICONO --- */}
                  <FontAwesomeIcon icon={link.icon} className="w-5 h-5" /> 
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Opcionalmente, puedes añadir un placeholder si quieres la navegación centrada: 
              <div className="w-12 flex-shrink-0" />
          */}
          
      </div>
    </div>
    </header>
  );
};

export default Navbar;