import { useState, useEffect } from 'react';
import FormularioCita from './FormularioCita';
import './App.css'; // Opcional, si tienes estilos

function App() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  // Consultar la API cuando el componente se monta (carga inicial)
  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/citas');
        if (!respuesta.ok) {
          throw new Error('Error al obtener las citas');
        }
        const datos = await respuesta.json();
        setCitas(datos);
      } catch (error) {
        console.error("Error de conexión:", error);
        setError("No se pudo conectar con el servidor backend.");
      }
    };

    obtenerCitas();
  }, []);

  return (
    <div className="App">
      <h1>Administración de Citas Veterinarias</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Sección del Formulario */}
        <div>
          <h2>Nueva Cita</h2>
          {/* Aquí inyectamos el componente y le pasamos los estados */}
          <FormularioCita citas={citas} setCitas={setCitas} />
        </div>

        {/* Sección de la Lista de Citas */}
        <div>
          <h2>Lista de Citas</h2>
          {citas.length === 0 ? (
            <p>No hay citas registradas o cargando...</p>
          ) : (
            <ul>
              {citas.map((cita) => (
                <li key={cita.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                  <strong>Mascota:</strong> {cita.mascota} <br />
                  <strong>Cliente:</strong> {cita.cliente} <br />
                  <strong>Servicio:</strong> {cita.servicio} <br />
                  <strong>Fecha y Hora:</strong> {cita.fecha} a las {cita.hora} <br />
                  <strong>Estado:</strong> {cita.estado}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
