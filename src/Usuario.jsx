import { Card, CardContent, Typography, Avatar } from "@mui/material";

function Usuario({ user }) {
  return (
    <Card
      sx={{
        width: 280,
        padding: 1,
        backgroundColor: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        borderRadius: 2,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Avatar
          sx={{
            bgcolor: "#1976d2",
            width: 56,
            height: 56,
            margin: "0 auto 10px auto",
            fontSize: "1.5rem",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          📧 {user.email}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          🏢 {user.company.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          📍 {user.address.city}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ☎️ {user.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Usuario;
