import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CircularProgress, Alert, TextField } from "@mui/material";
import YouTube from "react-youtube";

const MyWorkoutPlan = () => {
  const [planId, setPlanId] = useState(null);
  const [days, setDays] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

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

  useEffect(() => {
    if (auth) {
      fetchUserPlan();
    }
  }, [auth]);

  useEffect(() => {
    if (exercises.length > 0) {
      fetchExerciseLog(exercises[currentExerciseIndex].id);
    }
  }, [currentExerciseIndex, exercises]);

  const fetchUserPlan = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8080/api/details", {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.plan_id) {
          setPlanId(data.plan_id);
          fetchWorkoutDays(data.plan_id);
        } else {
          setLoading(false);
          setError("No workout plan assigned to your account");
        }
      })
      .catch(() => setError("Error fetching your workout plan. Please try again later."));
  };

  const fetchWorkoutDays = (planId) => {
    fetch(`http://localhost:8080/api/workout-plan/${planId}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setDays(data.days);
        setLoading(false);
      })
      .catch(() => setError("Error fetching workout days. Please try again later."));
  };

  const fetchExercisesForDay = (day) => {
    setSelectedDay(day);
    setCurrentExerciseIndex(0);
    setLoading(true);
    fetch(`http://localhost:8080/api/workout-plan/${planId}/day/${day}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch(() => setError("Error fetching exercises. Please try again later."));
  };

  const fetchExerciseLog = (exerciseId) => {
    fetch(`http://localhost:8080/api/exercise-log/latest/${exerciseId}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setSets(data.sets || 0);
        setReps(data.reps || 0);
        setWeight(data.weight || 0);
      })
      .catch(() => {
        setSets(0);
        setReps(0);
        setWeight(0);
      });
  };

  const submitExerciseLog = () => {
    fetch("http://localhost:8080/api/exercise-log", {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        exerciseId: exercises[currentExerciseIndex].id,
        sets,
        reps,
        weight,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .catch(() => setError("Failed to save exercise log. Please try again."));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 12, sm: 14 }, mb: 5, pt: 2 }}>
      <Card sx={{ p: 3, textAlign: "center", bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
          My Workout Plan
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <CircularProgress sx={{ my: 3 }} />}
        {!loading && selectedDay && exercises.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {exercises[currentExerciseIndex].name}
            </Typography>
            {exercises[currentExerciseIndex].youtube_link && (
              <Box sx={{ mt: 2 }}>
                <YouTube videoId={new URL(exercises[currentExerciseIndex].youtube_link).searchParams.get("v")} opts={{ width: "100%" }} />
              </Box>
            )}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
              <TextField label="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
              <TextField label="Reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
              <TextField label="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Box>
            <Button variant="contained" sx={{ mt: 2 }} onClick={submitExerciseLog}>
              Save Log
            </Button>
            {currentExerciseIndex < exercises.length - 1 && (
              <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={() => setCurrentExerciseIndex((prev) => prev + 1)}>
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
