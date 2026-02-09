import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faUser, 
  faClock, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
// Importamos el servicio centralizado
import { postContacto } from '../../services/api'; 

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // 1. Usamos la función del servicio api.ts
      await postContacto(formData);

      // 2. Éxito: Limpiamos y notificamos
      setStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      // 3. Error: Gestionado por el catch del servicio
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="bg-beige-light py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* COLUMNA 1: INFORMACIÓN */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl p-8 md:p-10 border border-gray-100 h-full">
            <h3 className="font-serif text-3xl text-title-sage mb-2">Nuestra Información</h3>
            <p className="text-sm text-secondary-muted mb-8">Encuéntranos o llámanos.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Dirección</h4>
                  <p className="text-secondary-muted leading-snug">C/ Pintor Agrassot, 19</p>
                  <p className="text-secondary-muted leading-snug">03110 Mutxamel (Alicante)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Teléfono</h4>
                  <p className="text-secondary-muted">+34 626 393 727</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Email</h4>
                  <p className="text-secondary-muted">info@casadegaia.es</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Persona de Contacto</h4>
                  <p className="text-secondary-muted">Katerin Sienkiewicz</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Horario de Atención</h4>
                  <p className="text-secondary-muted text-sm italic">Lunes a Viernes: 9:00 - 20:00</p>
                  <p className="text-secondary-muted text-sm italic">Sábados: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: FORMULARIO */}
        <div className="lg:col-span-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="font-serif text-3xl text-title-sage mb-2">Envíanos un Mensaje</h3>
              <p className="text-sm text-secondary-muted">Responderemos lo antes posible.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-dark ml-1">Nombre</label>
                  <input 
                    type="text" 
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-dark ml-1">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark ml-1">Teléfono</label>
                <input 
                  type="tel" 
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all"
                  placeholder="Tu número de contacto"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark ml-1">Mensaje</label>
                <textarea 
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all min-h-[150px]"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`w-full ${status === 'success' ? 'bg-green-600' : 'bg-[#c2c086]'} hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 group`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                {status === 'sending' ? 'Enviando...' : status === 'success' ? '¡Enviado con éxito!' : 'Enviar Mensaje'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-xs text-center">Hubo un error al enviar el mensaje. Inténtalo de nuevo.</p>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}