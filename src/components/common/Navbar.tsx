import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo-casa-de-gaia.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUsers, faTag, faBookOpen, faEnvelope, faBars, faTimes, type IconDefinition 
} from '@fortawesome/free-solid-svg-icons';

interface NavLink {
  name: string;
  path: string;
  icon: IconDefinition; 
}

const navLinks: NavLink[] = [
  { name: 'Inicio', path: '/', icon: faHome },
  { name: 'Nosotros', path: '/nosotros', icon: faUsers },
  { name: 'Tarifas', path: '/tarifas', icon: faTag },
  { name: 'Blog', path: '/blog', icon: faBookOpen },
  { name: 'Contacto', path: '/contacto', icon: faEnvelope },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-[#fdfdfb]/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#c2c086]/20'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> 
          
          {/* 1. LOGO */}
          <div className="flex-shrink-0 z-50"> 
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={logoImage} alt="Logo Casa de Gaia" className="h-12 md:h-14 w-auto" />
            </Link>
          </div>
          
          {/* 2. MENÚ DESKTOP (Se oculta en móvil: hidden, se muestra en md: flex) */}
          <nav className="hidden md:flex flex-grow justify-center">
            <div className="flex space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[#7a8a46] hover:text-[#a3b355] transition-all duration-300 font-bold text-base flex items-center space-x-2 font-serif group"
                >
                  <FontAwesomeIcon icon={link.icon} className="w-4 h-4 text-[#c2c086] group-hover:text-[#a3b355]" /> 
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* 3. BOTÓN HAMBURGUESA (Solo visible en móvil) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#7a8a46] p-2 focus:outline-none z-50"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. MENÚ DESPLEGABLE MÓVIL */}
      <div className={`
        md:hidden absolute top-0 left-0 w-full bg-[#fdfdfb] border-b border-[#c2c086]/20 transition-all duration-300 ease-in-out transform
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        <nav className="pt-24 pb-8 px-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-[#f5f5f0] text-[#7a8a46] font-bold text-xl font-serif transition-colors"
            >
              <FontAwesomeIcon icon={link.icon} className="text-[#c2c086] w-5" />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;