import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faUser, 
  faClock, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';

export default function ContactSection() {
  return (
    <section className="bg-beige-light py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* COLUMNA 1: INFORMACIÓN (2/5 del ancho) */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl p-8 md:p-10 border border-gray-100 h-full">
            <h3 className="font-serif text-3xl text-title-sage mb-2">Nuestra Información</h3>
            <p className="text-sm text-secondary-muted mb-8">Encuéntranos o llámanos.</p>
            
            <div className="space-y-8">
              {/* Dirección */}
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

              {/* Teléfono */}
              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Teléfono</h4>
                  <p className="text-secondary-muted">+34 626 393 727</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Email</h4>
                  <p className="text-secondary-muted">info@casadegaia.es</p>
                </div>
              </div>

              {/* Persona de Contacto */}
              <div className="flex items-start gap-4">
                <div className="text-[#c2c086] text-xl mt-1">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary-dark">Persona de Contacto</h4>
                  <p className="text-secondary-muted">Katerin Sienkiewicz</p>
                </div>
              </div>

              {/* Horario */}
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

        {/* COLUMNA 2: FORMULARIO (3/5 del ancho) */}
        <div className="lg:col-span-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="font-serif text-3xl text-title-sage mb-2">Envíanos un Mensaje</h3>
              <p className="text-sm text-secondary-muted">Responderemos lo antes posible.</p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-dark ml-1">Nombre</label>
                  <input 
                    type="text" 
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-dark ml-1">Email</label>
                  <input 
                    type="email" 
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all"
                  placeholder="Tu número de contacto"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary-dark ml-1">Mensaje</label>
                <textarea 
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2c086] transition-all min-h-[150px]"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#c2c086] hover:bg-[#b0ae75] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 group"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}