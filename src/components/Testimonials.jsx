import React, { useState, useEffect } from 'react';

const gamingQuotes = [
  "El mouse inalámbrico Nexus es increíble. Cero latencia y la batería me dura toda la semana de entrenamientos. ¡100% recomendado!",
  "El teclado mecánico y la silla cambiaron por completo mi setup. Mis dolores de espalda desaparecieron y mi precisión en Valorant mejoró muchísimo.",
  "Los audífonos 7.1 aíslan todo el ruido exterior. Puedo escuchar los pasos de los enemigos perfectamente y la comunicación con mi squad es nítida."
];

export default function Testimonials() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consumo de API externa usando fetch, async/await y useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=3&nat=es,us,gb');
        if (!response.ok) {
          throw new Error('Error al obtener datos de los clientes.');
        }
        const data = await response.json();
        setUsers(data.results);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="testimonials-section" id="testimonios">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Opiniones de la <span>Comunidad</span></h2>
          <p className="section-subtitle">
            Miles de jugadores profesionales y creadores de contenido ya confían en Nexus Gaming. Descubre lo que dicen de nosotros.
          </p>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando opiniones de gamers...</p>
          </div>
        ) : error ? (
          <div className="loading-spinner" style={{ color: 'var(--color-error)' }}>
            <p>No se pudieron cargar los testimonios. (Error: {error})</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {users.map((user, index) => (
              <div key={user.login.uuid} className="testimonial-card">
                <p className="testimonial-quote">
                  "{gamingQuotes[index] || "El equipamiento de Nexus superó todas mis expectativas. Excelente calidad de materiales y rendimiento."}"
                </p>
                <div className="testimonial-user">
                  <img 
                    src={user.picture.medium} 
                    alt={`${user.name.first} ${user.name.last}`} 
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-user-info">
                    <div className="testimonial-user-name">
                      {user.name.first} {user.name.last}
                    </div>
                    <div className="testimonial-user-title">
                      🎮 Gamer de {user.location.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
