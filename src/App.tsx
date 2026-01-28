import { Routes, Route } from 'react-router-dom';
import './index.css';

// Importa tus componentes de página
import Home from './pages/home/Home';
// Asegúrate de crear estos archivos en la carpeta pages/
import AboutPage from './pages/About'; 
import RatesPage from './pages/Rates';
import ContactPage from './pages/Contact';
import NotFound from './pages/NotFound'; // Componente de error 404

const App: React.FC = () => {
  return (
    <div className="min-h-screen antialiased">
      <Routes>
        {/* Rutas principales del sitio */}
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/tarifas" element={<RatesPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        {/* Ruta para el login, como en el Navbar */}
        <Route path="/login" element={<div>Página de Login</div>} /> 
        
        {/* Ruta catch-all para errores 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  );
};

export default App;