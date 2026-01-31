type Props = {}

export default function FindUs({}: Props) {

    return (
        // Contenedor principal con el fondo beige claro
        <section className={`bg-color-beige py-20`}> 
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Título "Encuéntranos" */}
                <h2 className={`text-4xl font-bold text-yellow-700 mb-12 font-serif`}>
                    Encuéntranos
                </h2>

                {/* Contenedor del Mapa con sombra, esquinas redondeadas y overflow-hidden */}
                <div className="shadow-xl/20 rounded-lg overflow-hidden border border-gray-200">
                    
                    {/* IMPLEMENTACIÓN DEL IFRAME PROPORCIONADO */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.981181385429!2d-0.45831212354112943!3d38.4002334758849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6231b9f5f06f89%3A0x9359ab1193bd5fc5!2sCasa%20De%20Gaia!5e1!3m2!1ses!2ses!4v1764101396240!5m2!1ses!2ses" 
                        // El estilo en línea debe ser un objeto en JSX
                        style={{ border: 0 }} 
                        // Ajustado a 100% para ser responsive dentro del max-w-4xl
                        width="100%" 
                        height="20%" 
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Casa de Gaia"
                    />
                </div>
            </div>
        </section>
    );
}