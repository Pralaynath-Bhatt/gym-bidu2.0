import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    
    // Save user info (replace with real authentication logic)
    localStorage.setItem("user", JSON.stringify({ username, password }));
    
    alert("Account created successfully! Please log in.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center">Sign Up</Typography>
        
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
        
        <TextField
          fullWidth
          type="password"
          margin="normal"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        {error && <Typography color="error">{error}</Typography>}
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
}
