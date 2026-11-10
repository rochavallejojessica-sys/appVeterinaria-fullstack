import { useState } from 'react';

export default function FormularioCita({ citas, setCitas }) {
  // Estados para los campos del formulario
  const [mascota, setMascota] = useState('');
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState(null);

  // 3. Integrar la petición POST (El Reto Principal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const nuevaCita = { mascota, cliente, servicio, fecha, hora };

    try {
      // Uso de fetch requerido por la rúbrica
      const respuesta = await fetch('http://localhost:3000/api/citas', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mascota: mascota,
          cliente: cliente,
          servicio: servicio,
          fecha: fecha,
          hora: hora
        })
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al guardar');
      }

      const respuestaBackend = await respuesta.json();
      // Extraemos solo el objeto "cita" que viene del backend
      setCitas([...citas, respuestaBackend.cita]);

      // Limpiar formulario
      setMascota('');
      setCliente('');
      setServicio('');
      setFecha('');
      setHora('');

    } catch (err) {
      // Mensaje de error visible para el usuario
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <input type="text" placeholder="Mascota" value={mascota} onChange={(e) => setMascota(e.target.value)} required />
      <input type="text" placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
      <input type="text" placeholder="Servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} required />
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
      
      <button type="submit">Nueva Cita</button>
    </form>
  );
}