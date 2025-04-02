import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CircularProgress, Alert } from "@mui/material";

const MyWorkoutPlan = () => {
  const [planId, setPlanId] = useState(null);
  const [days, setDays] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth credentials first
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      setAuth("Basic " + btoa(username + ":" + password));
    } else {
      setError("Authentication information not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  // Then fetch user plan after auth is set
  useEffect(() => {
    if (auth) {
      fetchUserPlan();
    }
  }, [auth]);

  const fetchUserPlan = () => {
    setLoading(true);
    setError(null);
    
    fetch("http://localhost:8080/api/details", {
      method: "GET",
      headers: { 
        "Authorization": auth,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch user plan: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User details:", data);
        if (data.plan_id) {
          setPlanId(data.plan_id);
          fetchWorkoutDays(data.plan_id);
        } else {
          setLoading(false);
          setError("No workout plan assigned to your account");
        }
      })
      .catch((err) => {
        console.error("Error fetching user plan:", err);
        setError("Error fetching your workout plan. Please try again later.");
        setLoading(false);
      });
  };

  const fetchWorkoutDays = (planId) => {
    setLoading(true);
    
    fetch(`http://localhost:8080/api/workout-plan/${planId}`, {
      method: "GET",
      headers: { 
        "Authorization": auth,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch workout days: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Plan data:", data);
        setDays(data.days);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workout days:", err);
        setError("Error fetching workout days. Please try again later.");
        setLoading(false);
      });
  };

  const fetchExercisesForDay = (day) => {
    setSelectedDay(day);
    setCurrentExerciseIndex(0);
    setLoading(true);
    
    fetch(`http://localhost:8080/api/workout-plan/${planId}/day/${day}`, {
      method: "GET",
      headers: { 
        "Authorization": auth,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch exercises: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Exercise data:", data);
        setExercises(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exercises:", err);
        setError("Error fetching exercises. Please try again later.");
        setLoading(false);
      });
  };

  const nextExercise = () => {
    setCurrentExerciseIndex((prev) => (prev < exercises.length - 1 ? prev + 1 : prev));
  };

  // Helper function to convert byte array to data URL for displaying GIF
  const byteArrayToDataUrl = (bytes) => {
    if (!bytes || bytes.length === 0) return null;
    
    // Convert byte array to base64 string
    const binaryString = bytes.map(byte => String.fromCharCode(byte)).join('');
    const base64 = btoa(binaryString);
    
    // Create data URL
    return `data:image/gif;base64,${base64}`;
  };

  return (
    // Adjusted container positioning to account for navbar
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: { xs: 12, sm: 14 }, // Increased top margin to account for navbar
        mb: 5, // Added bottom margin for spacing
        pt: 2 // Added top padding within the container
      }}
    >
      <Card sx={{ p: 3, textAlign: "center", bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
          My Workout Plan
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        {loading && <CircularProgress sx={{ my: 3 }} />}
        
        {!loading && !error && days > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1, mb: 3 }}>
            {Array.from({ length: days }, (_, i) => (
              <Button 
                key={i + 1} 
                variant={selectedDay === i + 1 ? "contained" : "outlined"} 
                onClick={() => fetchExercisesForDay(i + 1)}
              >
                Day {i + 1}
              </Button>
            ))}
          </Box>
        )}
        
        {!loading && !error && days === 0 && (
          <Typography variant="body1" color="textSecondary">
            No workout plan assigned.
          </Typography>
        )}

        {!loading && selectedDay && exercises.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Day {selectedDay} - Exercise {currentExerciseIndex + 1} of {exercises.length}
            </Typography>
            
            <Typography variant="body1"><strong>Name:</strong> {exercises[currentExerciseIndex].name}</Typography>
            <Typography variant="body1"><strong>Muscle Group:</strong> {exercises[currentExerciseIndex].muscle_group}</Typography>
            <Typography variant="body1"><strong>Target Muscle:</strong> {exercises[currentExerciseIndex].target_muscle}</Typography>
            
            <Box sx={{ mt: 2 }}>
              {/* Use either gifData (backend property) or convert from byte array */}
              {exercises[currentExerciseIndex].gifData && (
                <img 
                  src={byteArrayToDataUrl(exercises[currentExerciseIndex].gifData)} 
                  alt="Exercise demonstration" 
                  width="100%" 
                />
              )}
            </Box>
            
            {exercises[currentExerciseIndex].youtube_link && (
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => window.open(exercises[currentExerciseIndex].youtube_link, "_blank")}
              >
                Watch Video
              </Button>
            )}
            
            {currentExerciseIndex < exercises.length - 1 && (
              <Button 
                variant="contained" 
                sx={{ mt: 2, ml: 2 }} 
                onClick={nextExercise}
              >
                Next Exercise
              </Button>
            )}
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default MyWorkoutPlan;