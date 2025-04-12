import React, { useState, useEffect } from "react";
import { Container, Row, Col, Collapse, Button, Card } from "react-bootstrap";
import Fatloss_img from "./image/Fatloss.jpg";
import Recomp_img from "./image/Recomp.jpg";
import Weight_gain_img from "./image/weight_gain.jpg";

const plans = [
  {
    img: Fatloss_img,
    title: "Weight Loss",
    text: "Focused on burning fat and achieving a lean physique.",
    list: ["Calorie deficit diet", "High-intensity cardio", "Metabolic conditioning"],
    schedule: [
      "Upper-Lower (4 days a week)",
      "Upper-Lower-Push-Pull-Legs (5 days a week)",
      "Push-Pull-Legs (6 days a week)",
    ],
  },
  {
    img: Weight_gain_img,
    title: "Weight Gain",
    text: "Designed for building muscle mass and strength.",
    list: ["High-protein meal plans", "Progressive overload training", "Strength focus"],
    schedule: [
      "Upper-Lower (4 days a week)",
      "Upper-Lower-Push-Pull-Legs (5 days a week)",
      "Push-Pull-Legs (6 days a week)",
    ],
  },
  {
    img: Recomp_img,
    title: "Recomposition",
    text: "A balance between muscle gain and fat loss.",
    list: ["Macronutrient tracking", "Resistance training", "Body recomposition focus"],
    schedule: [
      "Upper-Lower (4 days a week)",
      "Upper-Lower-Push-Pull-Legs (5 days a week)",
      "Push-Pull-Legs (6 days a week)",
    ],
  },
];

const fadeUp = {
  opacity: 0,
  transform: "translateY(30px)",
  animation: "fadeUpAnim 0.8s ease forwards",
};

const fadeIn = {
  opacity: 0,
  animation: "fadeInAnim 1s ease forwards",
};

const globalAnimations = `
@keyframes fadeUpAnim {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInAnim {
  to {
    opacity: 1;
  }
}
`;

function GymPlans() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalAnimations;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container className="py-5" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-5" style={fadeIn}>Choose Your Fitness Plan</h2>
      {plans.map((plan, index) => (
        <Card
          key={index}
          className="mb-5 shadow"
          style={{
            ...fadeUp,
            borderRadius: "15px",
            transition: "transform 0.3s ease",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Row className="g-0 align-items-center">
            <Col
              md={4}
              style={{
                overflow: "hidden",
                borderRadius: "10px 0 0 10px",
                maxHeight: "250px",
              }}
            >
              <Card.Img
                src={plan.img}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Col>
            <Col md={8} className="p-4">
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", fontSize: "1.7rem" }}>
                  {plan.title}
                </Card.Title>
                <Card.Text className="text-muted fs-6">{plan.text}</Card.Text>
                <ul className="mb-3">
                  {plan.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <Button
                  variant="outline-primary"
                  onClick={() => toggleExpand(index)}
                  style={{
                    borderRadius: "30px",
                    fontWeight: "500",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {expandedIndex === index ? "Show Less ▲" : "Read More ▼"}
                </Button>
              </Card.Body>
            </Col>
          </Row>
          <Collapse in={expandedIndex === index}>
            <div
              className="p-4 bg-light"
              style={{
                animation: "fadeInAnim 0.4s ease forwards",
                borderTop: "1px solid #ddd",
                borderRadius: "0 0 15px 15px",
              }}
            >
              <h5>Training Schedules</h5>
              <ul>
                {plan.schedule.map((day, i) => (
                  <li key={i}>{day}</li>
                ))}
              </ul>
            </div>
          </Collapse>
        </Card>
      ))}
    </Container>
  );
}

export default GymPlans;
