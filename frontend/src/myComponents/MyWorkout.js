import React, { useState } from "react";
import { Container } from "react-bootstrap";


const muscles = [
  { id: "upper-chest", name: "Upper Chest" },
  { id: "mid-chest", name: "Mid Chest" },
  { id: "lower-chest", name: "Lower Chest" },
  { id: "quads", name: "Quadriceps" },
  { id: "hamstrings", name: "Hamstrings" },
  { id: "glutes", name: "Glutes" },
  { id: "biceps", name: "Biceps" },
  { id: "triceps", name: "Triceps" },
  { id: "front-delts", name: "Front Deltoids" },
  { id: "side-delts", name: "Side Deltoids" },
  { id: "rear-delts", name: "Rear Deltoids" },
  { id: "traps", name: "Trapezius" },
  { id: "lats", name: "Latissimus Dorsi" },
  { id: "lower-back", name: "Lower Back" },
  { id: "abs", name: "Abdominals" },
  { id: "calves", name: "Calves" }
];

function MuscleHighlight() {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <Container className="muscle-container">
      <div className="muscle-figure">
        {muscles.map((muscle) => (
          <div
            key={muscle.id}
            className={`muscle-zone ${muscle.id} ${highlighted === muscle.id ? "highlight" : ""}`}
            onMouseEnter={() => setHighlighted(muscle.id)}
            onMouseLeave={() => setHighlighted(null)}
          ></div>
        ))}
      </div>
      <div className="muscle-info">
        {highlighted ? <h3>{muscles.find((m) => m.id === highlighted)?.name}</h3> : <h3>Hover over a muscle</h3>}
      </div>
    </Container>
  );
}

export default MuscleHighlight;
