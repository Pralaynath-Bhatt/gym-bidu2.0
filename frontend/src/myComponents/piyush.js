import React, { useEffect, useState } from "react";
import axios from "axios";

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

const Workout = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [goal, setGoal] = useState("");
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fadeInKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSaveUser = async () => {
    if (!age || !weight || !height) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/save_user", {
        age: parseFloat(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
      });
      setBmi(response.data.bmi);
      setGoal(response.data.goal);
    } catch (error) {
      alert("Error saving user data. Please try again.");
    }
  };

  const handlePredictCalories = async () => {
    if (!bmi) {
      alert("Please calculate BMI first.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_calories", {
        steps: 5000,
        workout_minutes: 30,
        age: parseFloat(age),
        weight: parseFloat(weight),
        bmi: parseFloat(bmi),
      });
      setCalories(response.data.predicted_calories);
    } catch (error) {
      alert("Error predicting calories. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Workout Planner</h2>

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Height (m)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSaveUser} style={styles.button}>
        Save User
      </button>

      {bmi !== null && (
        <p style={styles.text}>BMI: {bmi.toFixed(2)}</p>
      )}
      {goal && (
        <p style={styles.text}>Recommended Goal: {goal}</p>
      )}

      <button onClick={handlePredictCalories} style={{ ...styles.button, backgroundColor: "#007bff" }}>
        Predict Calories to be Burned
      </button>

      {calories !== null && (
        <p style={{ ...styles.text, color: "#17a2b8" }}>
          Predicted Calories to be Burned: {calories.toFixed(2)} kcal
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "80px",
    padding: "30px",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    background: "#fefefe",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    animation: "fadeSlideIn 1s ease"
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#343a40"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "1rem",
    transition: "0.3s",
    outline: "none",
    animation: "fadeSlideIn 1s ease"
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: "15px",
    animation: "pulse 1.5s infinite ease",
  },
  text: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    animation: "fadeSlideIn 1s ease"
  }
};

export default Workout;
