import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const fadeInKeyframes = `
@keyframes fadeSlideIn {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
  100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
}
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal state for successful login
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fadeInKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password_hash: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json(); 

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }

      setOpenModal(true); // Open the success modal
      setTimeout(() => navigate("/"), 2000); // Navigate to home after 2 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
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
          animation: "fadeSlideIn 1s ease",
        }}
      >
        <Typography variant="h5" textAlign="center" sx={{ animation: "fadeSlideIn 1s ease" }}>
          Login
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />

        <TextField
          fullWidth
          type="password"
          margin="normal"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />

        {error && (
          <Typography color="error" textAlign="center" sx={{ animation: "fadeSlideIn 1s ease" }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, animation: "pulse 1.5s infinite ease" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography textAlign="center" sx={{ mt: 2, animation: "fadeSlideIn 1s ease" }}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </Typography>
      </Box>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Login Successful!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have successfully logged in. Redirecting to the home page...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
