import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CircularProgress, Alert, TextField } from "@mui/material";
import YouTube from "react-youtube";

const MyWorkoutPlan = () => {
  const [userId, setUserId] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [authDetails, setAuthDetails] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exerciseLog, setExerciseLog] = useState({ sets: "", reps: "", weight: "" });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    setAuthDetails({ username, password });

    if (username && password) {
      const auth = "Basic " + btoa(username + ":" + password);
      fetchUserPlan(auth);
    } else {
      setError("Authentication information not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      fetchLatestExerciseLog(exercises[currentExerciseIndex]?.id);
    }
  }, [currentExerciseIndex, exercises]);

  const fetchUserPlan = (auth) => {
    setLoading(true);
    fetch("http://localhost:8080/api/details", {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.user_id);
        if (data.plan_id) {
          setPlanId(data.plan_id);
          fetchWorkoutDays(data.plan_id, auth);
        } else {
          setLoading(false);
          setError("No workout plan assigned to your account.");
        }
      })
      .catch(() => setError("Error fetching your workout plan. Please try again later."));
  };

  const fetchWorkoutDays = (planId, auth) => {
    fetch(`http://localhost:8080/api/workout-plan/${planId}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDays(Array.from({ length: data.days }, (_, i) => i + 1));
        setLoading(false);
      })
      .catch(() => setError("Error fetching workout days. Please try again later."));
  };

  const fetchExercisesForDay = (day) => {
    setSelectedDay(day);
    setCurrentExerciseIndex(0);
    setLoading(true);
    const auth = "Basic " + btoa(authDetails.username + ":" + authDetails.password);
    fetch(`http://localhost:8080/api/workout-plan/${planId}/day/${day}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch(() => setError("Error fetching exercises. Please try again later."));
  };

  const fetchLatestExerciseLog = (exerciseId) => {
    const auth = "Basic " + btoa(authDetails.username + ":" + authDetails.password);
    fetch(`http://localhost:8080/api/exercise-log/latest?userId=${userId}&exerciseId=${exerciseId}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setExerciseLog(data))
      .catch(() => setError("Failed to fetch previous exercise log."));
  };

  const submitExerciseLog = () => {
    const auth = "Basic " + btoa(authDetails.username + ":" + authDetails.password);
    fetch("http://localhost:8080/api/exercise-log/save", {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: parseInt(userId, 10),
        exerciseId: exercises[currentExerciseIndex].id,
        sets: parseInt(exerciseLog.sets, 10),
        reps: parseInt(exerciseLog.reps, 10),
        weight: parseFloat(exerciseLog.weight),
      }),
    }).catch(() => setError("Failed to save exercise log. Please try again."));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5, pt: 2 }}>
      <Card sx={{ p: 3, textAlign: "center", bgcolor: "#fff", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
          My Workout Plan
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && <CircularProgress sx={{ my: 3 }} />}
        {!loading && !error && (
          <Box>
            {selectedDay === null ? (
              days.map((day) => (
                <Button key={day} onClick={() => fetchExercisesForDay(day)} sx={{ m: 1 }}>Day {day}</Button>
              ))
            ) : (
              <>
                <Typography variant="h6">{exercises[currentExerciseIndex]?.name}</Typography>
                <YouTube videoId={exercises[currentExerciseIndex]?.youtube_link?.split("v=")[1]?.split("&")[0]} />
                <TextField label="Sets" value={exerciseLog.sets} fullWidth margin="normal" onChange={(e) => setExerciseLog({ ...exerciseLog, sets: e.target.value })} />
                <TextField label="Reps" value={exerciseLog.reps} fullWidth margin="normal" onChange={(e) => setExerciseLog({ ...exerciseLog, reps: e.target.value })} />
                <TextField label="Weight (kg)" value={exerciseLog.weight} fullWidth margin="normal" onChange={(e) => setExerciseLog({ ...exerciseLog, weight: e.target.value })} />
                <Button onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))} sx={{ mt: 2, mr: 2 }} variant="contained">Previous Exercise</Button>
                <Button onClick={submitExerciseLog} sx={{ mt: 2, mr: 2 }} variant="contained">Save Log</Button>
                <Button onClick={() => setCurrentExerciseIndex(Math.min(exercises.length - 1, currentExerciseIndex + 1))} sx={{ mt: 2 }} variant="contained">Next Exercise</Button>
              </>
            )}
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default MyWorkoutPlan;
