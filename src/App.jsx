import { useEffect, useState, useMemo } from 'react';
import Usuario from './Usuario';
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAsc, setOrdenAsc] = useState(true);

  // ✅ Función reutilizable para cargar datos (permite recargar)
  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Error al obtener datos de la API');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ✅ Memoización: evita recalcular si no cambian dependencias
  const usuariosProcesados = useMemo(() => {
    const filtrados = usuarios.filter((user) =>
      user.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    return filtrados.sort((a, b) =>
      ordenAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [usuarios, busqueda, ordenAsc]);

  if (cargando)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        padding: '30px',
        textAlign: 'center',
        backgroundColor: '#e9eef3',
        color: '#222',
        boxSizing: 'border-box',
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#1a1a1a',
        }}
      >
        📋 Usuarios desde API Pública
      </Typography>

      {/* Mostrar error si existe */}
      {error && (
        <Alert severity="error" sx={{ maxWidth: 400, margin: '10px auto' }}>
          {error}
        </Alert>
      )}

      {/* Campo de búsqueda */}
      <TextField
        label="Buscar por nombre..."
        variant="outlined"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{
          marginBottom: 2,
          width: 300,
          backgroundColor: '#fff',
          borderRadius: 1,
        }}
      />

      {/* Controles de orden y recarga */}
      <Box sx={{ marginBottom: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SortByAlphaIcon />}
          onClick={() => setOrdenAsc(!ordenAsc)}
          sx={{ fontWeight: 'bold' }}
        >
          {ordenAsc ? 'ASC' : 'DESC'}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<RefreshIcon />}
          onClick={cargarUsuarios}
        >
          Recargar
        </Button>
      </Box>

      {/* Lista de usuarios */}
      {usuariosProcesados.length === 0 ? (
        <Typography>No se encontraron usuarios.</Typography>
      ) : (
        <Fade in={true}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {usuariosProcesados.map((user) => (
              <Usuario key={user.id} user={user} />
            ))}
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default App;
