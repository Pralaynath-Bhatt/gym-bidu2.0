import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // "password" instead of "password_hash"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure we're sending JSON
        },
        body: JSON.stringify({ username, password_hash: password }), // Send username and password_hash
      });
  
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
  
      const data = await response.json(); // Parse JSON response
  
      // Store the token and logged-in status in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLoggedIn", "true");
      }
  
      alert(data.message); // Show the message from the backend
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.message); // Show error message
    }
  };
  
  return (
    <Container 
      maxWidth="xs"
      sx={{
        height: "100vh", // Full screen height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box 
        sx={{ 
          p: 4, 
          border: "1px solid #ccc", 
          borderRadius: 3, 
          boxShadow: 3,
          width: "100%",
          maxWidth: "400px",
          bgcolor: "white",
        }}
      >
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
          type="password" // Use standard "password" field
          margin="normal"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <Typography color="error" textAlign="center">{error}</Typography>}
        
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
