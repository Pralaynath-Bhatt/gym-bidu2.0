import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, MenuItem } from "@mui/material";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, mobile, password, goal, plan }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed. Try a different username.");
      }

      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container 
  maxWidth="xs"
  sx={{
    mt: 8, // Push content down to avoid overlap with navbar
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
        }}
      >
        <Typography variant="h5" textAlign="center">Sign Up</Typography>
        
        <TextField fullWidth margin="normal" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth margin="normal" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth margin="normal" label="Mobile Number" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <TextField fullWidth type="password" margin="normal" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField fullWidth type="password" margin="normal" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        <TextField
          select
          fullWidth
          margin="normal"
          label="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <MenuItem value="Weight Loss">Weight Loss</MenuItem>
          <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
          <MenuItem value="Recomposition">Recomposition</MenuItem>
          <MenuItem value="Cardio">Cardio</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Workout Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <MenuItem value="4 days a week">4 days a week</MenuItem>
          <MenuItem value="5 days a week">5 days a week</MenuItem>
          <MenuItem value="6 days a week">6 days a week</MenuItem>
        </TextField>
        
        {error && <Typography color="error" textAlign="center">{error}</Typography>}
        
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSignUp}>Sign Up</Button>
        <Typography textAlign="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
}
