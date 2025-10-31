import { useEffect, useState } from 'react';
import Usuario from './Usuario';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAsc, setOrdenAsc] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener datos de la API');
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">Error: {error}</Typography>;

  const usuariosFiltrados = usuarios.filter((user) =>
    user.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const usuariosOrdenados = [...usuariosFiltrados].sort((a, b) =>
    ordenAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (

    <Box
  sx={{
    width: "100vw",          // 🔹 Ocupa todo el ancho de la ventana
    minHeight: "100vh",      // 🔹 Ocupa toda la altura visible
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#e9eef3", // 🔹 Color coherente con el body
    color: "#222",
    boxSizing: "border-box", // 🔹 Evita desbordes por padding
  }}
>

      {/* Título visible */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#1a1a1a', // 🔹 Asegura buena visibilidad
        }}
      >
        <span role="img" aria-label="clipboard" style={{ marginRight: '8px' }}>
          📋
        </span>
        Usuarios desde API Pública
      </Typography>

      {/* Campo de búsqueda */}
      <TextField
        label="Buscar por nombre..."
        variant="outlined"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{
          marginBottom: 2,
          width: 300,
          backgroundColor: '#fff', // 🔹 Fondo blanco visible
          borderRadius: 1,
        }}
      />

      {/* Botón de orden */}
      <Box sx={{ marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOrdenAsc(!ordenAsc)}
          sx={{ fontWeight: 'bold' }}
        >
          ORDENAR POR NOMBRE ({ordenAsc ? 'ASC' : 'DESC'})
        </Button>
      </Box>

      {/* Lista de usuarios */}
      {usuariosOrdenados.length === 0 ? (
        <Typography>No se encontraron usuarios.</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {usuariosOrdenados.map((user) => (
            <Usuario key={user.id} user={user} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default App;
