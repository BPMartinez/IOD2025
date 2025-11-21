import { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as: ${email}`);
  };

  return (
    <Box maxWidth={400}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
