function Usuario({ user }) {
  return (
    <li style={{
      borderBottom: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      listStyle: 'none'
    }}>
      <strong>{user.name}</strong> - {user.email}
      <p>📍 Ciudad: {user.address.city}</p>
      <p>🏢 Empresa: {user.company.name}</p>
    </li>
  );
}

export default Usuario;

