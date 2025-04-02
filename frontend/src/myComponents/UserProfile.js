import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, MenuItem, Card } from "@mui/material";

const UserProfile = () => {
  const [user, setUser ] = useState({
    username: '',
    goal: '',
    plan_id: '',
    email: '',
    phone_number: '',
    weight: '',
    height: '',
    chest: '',
    shoulders: '',
    waist: '',
    hips: '',
    biceps: '',
    forearm: '',
    thighs: '',
    calves: '',
    bmi: '',
    joinDate: '' // Ensure joinDate is included in the initial state
  });
  const [isEditing, setIsEditing] = useState(false);
  const [authDetails, setAuthDetails] = useState({ username: localStorage.getItem("username"), password: localStorage.getItem("password") });
  const [error, setError] = useState('');

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    setAuthDetails({ username, password });

    if (username && password) {
      const auth = "Basic " + btoa(username + ":" + password);
      fetchUserData(auth);
    }
  }, []);

  const fetchUserData = (auth) => {
    fetch('http://localhost:8080/api/details', {
      method: "GET",
      headers: { "Authorization": auth },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => setUser (data))
      .catch((error) => {
        setError(error.message);
        console.error('Error fetching user data:', error);
      });
  };

  const handleChange = (e) => {
    setUser ({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = authDetails;

    if (username && password) {
      const auth = "Basic " + btoa(username + ":" + password);
      fetch('http://localhost:8080/api/details', {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": auth },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user profile");
          }
          return response.json();
        })
        .then(() => {
          alert('Profile updated successfully');
          setIsEditing(false);
          setError(''); // Clear any previous errors
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error updating user data:', error);
        });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, width: "100%", bgcolor: "white" }}>
        <Typography variant="h5" textAlign="center" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>User  Profile</Typography>

        {error && <Typography color="error" textAlign="center">{error}</Typography>}

        {!isEditing ? (
          <div>
            {Object.keys(user).map((key) => (
              key !== 'password_hash' && (
                <Typography key={key} variant="body1" sx={{ mb: 1 }}>
                  <strong>{key.replace("_", " ")}:</strong> {key === 'joinDate' ? user[key].slice(0, 10) : user[key]}
                </Typography>
              )
            ))}
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField select fullWidth margin="normal" label="Goal" value={user.goal} onChange={handleChange} name="goal">
              <MenuItem value="Weight Loss">Weight Loss</MenuItem>
              <MenuItem value="Muscle Gain">Muscle Gain</MenuItem>
              <MenuItem value="Recomposition">Recomposition</MenuItem>
            </TextField>

            <TextField select fullWidth margin="normal" label="Plan ID" value={user.plan_id} onChange={handleChange} name="plan_id">
              <MenuItem value={1}>Push-Pull-Legs (PPL)</MenuItem>
              <MenuItem value={2}>Upper-Lower (UL)</MenuItem>
              <MenuItem value={3}>Upper-Lower-Push-Pull-Legs (UL-PPL)</MenuItem>
            </TextField>

            {Object.keys(user).map((key) => (
              key !== 'username' && key !== 'goal' && key !== 'plan_id' && key !== 'joinDate' && key !== 'bmi' && (
                <TextField key={key} fullWidth margin="normal" label={key.replace("_", " ")} value={user[key]} onChange={handleChange} name={key} />
              )
            ))}

            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">Save Changes</Button>
          </form>
        )}
      </Card>
    </Container>
  );
};

export default UserProfile;