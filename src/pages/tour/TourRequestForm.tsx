import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faUser, faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { postSolicitarTour } from '../../services/api'; 

export default function TourRequestForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await postSolicitarTour({
        nombre: formData.nombre,
        email: formData.correo,
        telefono: formData.telefono
      });

      setStatus('success');
      setFormData({ nombre: '', telefono: '', correo: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    /* SECCIÓN ENVOLVENTE: Añadimos py-20 para dar aire arriba y abajo */
    <section className="py-24 px-4 bg-beige-light/30"> 
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado opcional para mejorar la composición */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-title-sage mb-4">¿Quieres conocernos?</h2>
          <p className="text-secondary-muted max-w-lg mx-auto">
            Estaremos encantados de enseñarte cada rincón de Casa de Gaia y resolver tus dudas en persona.
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="max-w-md mx-auto bg-white rounded-4xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-[#7a8a46] p-8 text-center text-white">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl mb-3" />
            <h3 className="font-serif text-3xl">Solicita un Tour</h3>
            <p className="text-sm opacity-90">Reserva tu visita presencial</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Nombre Completo</label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c2c086]" />
                <input 
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#c2c086] focus:ring-4 focus:ring-[#c2c086]/10 transition-all text-sm"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Teléfono</label>
              <div className="relative">
                <FontAwesomeIcon icon={faPhone} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c2c086]" />
                <input 
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#c2c086] focus:ring-4 focus:ring-[#c2c086]/10 transition-all text-sm"
                  placeholder="600 000 000"
                />
              </div>
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-wider">Correo Electrónico</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c2c086]" />
                <input 
                  type="email"
                  required
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#c2c086] focus:ring-4 focus:ring-[#c2c086]/10 transition-all text-sm"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 shadow-lg hover:-translate-y-0.5 active:translate-y-0
                ${status === 'success' ? 'bg-green-600' : 'bg-primary-dark hover:bg-black'}`}
            >
              <FontAwesomeIcon icon={status === 'success' ? faPaperPlane : faCalendarCheck} />
              {status === 'sending' ? 'Enviando...' : status === 'success' ? '¡Solicitud Enviada!' : 'Agendar Visita'}
            </button>

            {status === 'error' && (
              <p className="text-red-500 text-[10px] text-center uppercase font-bold tracking-widest">Error al procesar, reintenta más tarde</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}