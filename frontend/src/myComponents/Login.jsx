import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
      setError("Invalid username or password!");
      return;
    }
    
    setError("");
    alert("Login successful!");
    
    // Save login state (Replace with real authentication logic)
    localStorage.setItem("isLoggedIn", "true");
    
    navigate("/"); // Redirect to home page
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center">Login</Typography>
        
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <TextField
          fullWidth
          type="password"
          margin="normal"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <Typography color="error">{error}</Typography>}
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </Typography>
      </Box>
    </Container>
  );
}
