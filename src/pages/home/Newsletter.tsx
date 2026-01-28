import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagicWandSparkles, faGift } from '@fortawesome/free-solid-svg-icons';

type Props = {}

export default function Newsletter({}: Props) {
  return (
    <section className="bg-beige-light py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* --- Columna Izquierda: Texto --- */}
        <div className="space-y-6">
          <div className="text-3xl"> <FontAwesomeIcon icon={faMagicWandSparkles} /> </div> {/* Icono de chispas */}
          
          <h2 className="text-4xl md:text-5xl font-serif text-title-sage leading-tight">
            ¡No te Pierdas Nada!
          </h2>
          
          <p className="text-primary-dark text-lg leading-relaxed">
            Suscríbete a nuestra newsletter y sé el primero en conocer nuestras <strong>ofertas exclusivas</strong>, próximos <strong>eventos</strong>, <strong>fiestas temáticas</strong> y todas las novedades de Casa de Gaia.
          </p>
          
          <p className="text-secondary-muted italic">
            Prometemos no llenar tu bandeja de entrada, solo inspiración y oportunidades únicas.
          </p>
          
          <div className="flex items-center space-x-3 pt-4">
            <div className="text-2xl text-title-sage">
              <FontAwesomeIcon icon={faGift} />
            </div>
            <p className="font-semibold text-primary-dark">
              Recibe sorpresas y descuentos especiales solo para suscriptores.
            </p>
          </div>
        </div>

        {/* --- Columna Derecha: Tarjeta del Formulario --- */}
        <div className="bg-card-white p-8 md:p-10 rounded-xl shadow-card">
          <form className="space-y-6">
            
            {/* Campo Nombre */}
            <div>
              <label className="block text-label-sage mb-2">Nombre (Opcional)</label>
              <input 
                type="text" 
                placeholder="Tu nombre" 
                className="input-field"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-label-sage mb-2">Correo Electrónico*</label>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                required 
                className="input-field"
              />
            </div>

            {/* Checkbox Privacidad */}
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="privacy" 
                required 
                className="mt-1 accent-[#a3a380]" 
              />
              <label htmlFor="privacy" className="text-sm text-secondary-muted">
                He leído y acepto la <a href="/privacidad" className="underline hover:text-title-sage">Política de Privacidad</a>.*
              </label>
            </div>

            {/* Botón Enviar (Basado en el color de botón que me pediste antes) */}
            <button 
              type="submit" 
              className="w-full bg-button-sage text-white-pure py-3 rounded-lg font-bold hover:opacity-90 transition shadow-md"
            >
              SUSCRIBIRME
            </button>
            
          </form>
        </div>

      </div>
    </section>
  )
}