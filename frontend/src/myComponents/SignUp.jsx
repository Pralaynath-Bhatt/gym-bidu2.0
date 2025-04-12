import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password_hash, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [plan_id, setPlan_id] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fadeInKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSignUp = async () => {
    if (password_hash !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phone_number, password_hash, goal, plan_id }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed. Try a different username.");
      }

      setOpenModal(true); // Open the success modal
      // Optionally navigate after some time
      setTimeout(() => navigate("/login"), 2000); // Navigate to login after 2 seconds
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
        mt: 8,
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
          Sign Up
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
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          type="tel"
          value={phone_number}
          onChange={(e) => setphone_number(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />
        <TextField
          fullWidth
          type="password"
          margin="normal"
          label="Password"
          value={password_hash}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />
        <TextField
          fullWidth
          type="password"
          margin="normal"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        >
          <MenuItem value="Weight Loss">Weight Loss</MenuItem>
          <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
          <MenuItem value="Recomposition">Recomposition</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Workout Plan"
          value={plan_id}
          onChange={(e) => setPlan_id(e.target.value)}
          sx={{ animation: "fadeSlideIn 1s ease" }}
        >
          <MenuItem value="2">Upper-Lower (4 days a week)</MenuItem>
          <MenuItem value="3">Upper-Lower-Push-Pull-Legs (5 days a week)</MenuItem>
          <MenuItem value="1">Push-Pull-Legs (6 days a week)</MenuItem>
        </TextField>

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
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Typography textAlign="center" sx={{ mt: 2, animation: "fadeSlideIn 1s ease" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>

      {/* Success Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your account has been created successfully. You will be redirected to the login page.
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
