import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";
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
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [weights, setWeights] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [previousWorkoutData, setPreviousWorkoutData] = useState({
    reps: "",
    sets: "",
    weights: "",
  });

  // Set authentication on page load
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

  // Fetch user's workout plan on auth change
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
        if (data.length > 0) {
          setExerciseId(data[0]?.exercise_id);
          fetchPreviousWorkoutData(data[0]?.exercise_id);
        } else {
          setExerciseId("");
        }
        setLoading(false);
      })
      .catch(() => setError("Error fetching exercises. Please try again later."));
  };

  const fetchPreviousWorkoutData = (exerciseId) => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/api/exercise-log/latest?userId=${userId}&exerciseId=${exerciseId}`, {
      method: "GET",
      headers: { Authorization: auth, "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data) {
          setPreviousWorkoutData({
            reps: data.reps,
            sets: data.sets,
            weights: data.weight_used,
          });
        } else {
          resetInputFields();
        }
      })
      .catch(() => setError("Error fetching previous workout data. Please try again later."));
  };

  const nextExercise = () => {
    setPreviousWorkoutData({ reps: "", sets: "", weights: "" });
    setCurrentExerciseIndex((prev) => {
      const newIndex = prev < exercises.length - 1 ? prev + 1 : prev;
      if (exercises[newIndex]) {
        setExerciseId(exercises[newIndex].exercise_id);
        fetchPreviousWorkoutData(exercises[newIndex].exercise_id);
      }
      return newIndex;
    });
    resetInputFields();
  };

  const prevExercise = () => {
    setCurrentExerciseIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : prev;
      if (exercises[newIndex]) {
        setExerciseId(exercises[newIndex].exercise_id);
        fetchPreviousWorkoutData(exercises[newIndex].exercise_id);
      }
      return newIndex;
    });
    resetInputFields();
  };

  const resetInputFields = () => {
    setReps("");
    setSets("");
    setWeights("");
  };

  const saveWorkoutData = () => {
    const userId = localStorage.getItem("userId");
    const workoutData = {
      userId: parseInt(userId),
      exerciseId: parseInt(exerciseId),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weights),
    };

    fetch(`http://localhost:8080/api/exercise-log/save`, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    })
      .then((res) => {
        if (res.ok) {
          nextExercise();
        } else {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to save workout data");
          });
        }
      })
      .catch((error) => {
        setError("Error saving workout data. Please try again.");
      });
  };

  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", display: "flex", alignItems: "center", justifyContent: "center", mt: { xs: 10, sm: 12, md: 14 } }}>
      <Container maxWidth="md" sx={{ p: 4 }}>
        <Card sx={{ p: 4, textAlign: "center", backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "20px", boxShadow: "0px 4px 20px rgba(0,0,0,0.2)" }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold", color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>
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
                  sx={{
                    bgcolor: selectedDay === i + 1 ? "#1976d2" : "#fff",
                    color: selectedDay === i + 1 ? "#fff" : "#1976d2",
                    "&:hover": { bgcolor: selectedDay === i + 1 ? "#115293" : "#e0e0e0", color: selectedDay === i + 1 ? "#fff" : "#1976d2" },
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                >
                  Day {i + 1}
                </Button>
              ))}
            </Box>
          )}
          {!loading && selectedDay && exercises.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#fff" }}>
                Day {selectedDay} - Exercise {currentExerciseIndex + 1} of {exercises.length}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}><strong>Name:</strong> {exercises[currentExerciseIndex].name}</Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}><strong>Muscle Group:</strong> {exercises[currentExerciseIndex].muscle_group}</Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}><strong>Target Muscle:</strong> {exercises[currentExerciseIndex].target_muscle}</Typography>
              {exercises[currentExerciseIndex].youtube_link && (
                <Box sx={{ mt: 2 }}>
                  <YouTube videoId={getYouTubeId(exercises[currentExerciseIndex].youtube_link)} opts={{ width: "100%" }} />
                </Box>
              )}
              <Box sx={{ mt: 2, mb: 2, padding: 2, border: "1px solid #fff", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>Previous Workout Data</Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}><strong>Reps:</strong> {previousWorkoutData.reps || "N/A"}</Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}><strong>Sets:</strong> {previousWorkoutData.sets || "N/A"}</Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}><strong>Weight (kg):</strong> {previousWorkoutData.weights || "N/A"}</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField label="Reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} variant="outlined" sx={{ mr: 2 }} />
                <TextField label="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} variant="outlined" sx={{ mr: 2 }} />
                <TextField label="Weight (kg)" type="number" value={weights} onChange={(e) => setWeights(e.target.value)} variant="outlined" />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button variant="contained" onClick={saveWorkoutData} sx={{ bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#115293" } }}>Save</Button>
                {currentExerciseIndex > 0 && <Button variant="contained" onClick={prevExercise} sx={{ bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#115293" } }}>Previous Exercise</Button>}
                {currentExerciseIndex < exercises.length - 1 && <Button variant="contained" onClick={nextExercise} sx={{ bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#115293" } }}>Next Exercise</Button>}
              </Box>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default MyWorkoutPlan;
