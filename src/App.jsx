import { useEffect, useState } from 'react';
import Usuario from './Usuario';
//pruba 
function App() {
  const [usuarios, setUsuarios] = useState([]); // Estado original de la API
  const [cargando, setCargando] = useState(true); // Para mostrar mensaje de carga
  const [error, setError] = useState(null); // Para mostrar errores
  const [busqueda, setBusqueda] = useState(''); // Estado para filtrar usuarios por nombre
  const [ordenAsc, setOrdenAsc] = useState(true); //estado  true = ASC, false = DESC

  // useEffect: se ejecuta solo una vez al cargar el componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then((data) => {
        setUsuarios(data); // Guardamos los usuarios
        setCargando(false); // Ya no está cargando
      })
      .catch((err) => {
        setError(err.message); // Si hay error, lo guardamos
        setCargando(false); // También detenemos el "loading"
      });
  }, []);

  // Si todavía está cargando, mostramos mensaje
  if (cargando) return <p>Cargando usuarios...</p>;

  // Si hubo un error al obtener los datos
  if (error) return <p>Error: {error}</p>;

  //  Filtramos por nombre usando el input de búsqueda
  const usuariosFiltrados = usuarios.filter((user) =>
    user.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  //  Ordenamos alfabéticamente (según el estado `ordenAsc`)
  const usuariosOrdenados = [...usuariosFiltrados].sort((a, b) => {
    return ordenAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div>
      <h1>Usuarios desde API</h1>

      {/* Input controlado para buscar por nombre */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '10px',
          width: '300px',
          fontSize: '16px',
          color: '#000',
          backgroundColor: '#fff'
        }}
      />

      {/* Botón para cambiar entre orden ascendente/descendente */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setOrdenAsc(!ordenAsc)}
          style={{ padding: '8px 12px', cursor: 'pointer' }}
        >
          Ordenar por nombre ({ordenAsc ? 'ASC' : 'DESC'})
        </button>
      </div>

      {/*  Mostrar lista ordenada y filtrada */}
      {usuariosOrdenados.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <ul>
          {usuariosOrdenados.map((user) => (
            <Usuario key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
