import React, { useState } from "react";
import axios from "axios";

const Workout = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [goal, setGoal] = useState("");
  const [calories, setCalories] = useState(null);

  const handleSaveUser = async () => {
    const response = await axios.post("http://127.0.0.1:5000/save_user", {
      age,
      weight,
      height,
    });
    setBmi(response.data.bmi);
    setGoal(response.data.goal);
  };

  const handlePredictCalories = async () => {
    const response = await axios.post("http://127.0.0.1:5000/predict_calories", {
      steps: 5000,
      workout_minutes: 30,
      age,
      weight,
      bmi,
    });
    setCalories(response.data.predicted_calories);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Workout Planner</h2>
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} style={styles.input} />
      <input type="number" placeholder="Weight (kg)" onChange={(e) => setWeight(e.target.value)} style={styles.input} />
      <input type="number" placeholder="Height (m)" onChange={(e) => setHeight(e.target.value)} style={styles.input} />
      <button onClick={handleSaveUser} style={styles.button}>Save User</button>

      {bmi && <p style={styles.text}>BMI: {bmi.toFixed(2)}</p>}
      {goal && <p style={styles.text}>Recommended Goal: {goal}</p>}

      <button onClick={handlePredictCalories} style={styles.button}>Predict Calories Burned</button>
      {calories && <p style={styles.text}>Predicted Calories Burned: {calories.toFixed(2)} kcal</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    marginTop: "80px", // Push content below navbar
    padding: "20px",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    background: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  heading: {
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  },
  text: {
    fontWeight: "bold"
  }
};

export default Workout;
