import React, { useState } from "react";
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
    schedule: ["Upper-Lower (4 days a week)", "Upper-Lower-Push-Pull-Legs (5 days a week)", "Push-Pull-Legs (6 days a week)"],  
  },
  {
    img: Weight_gain_img,
    title: "Weight Gain",
    text: "Designed for building muscle mass and strength.",
    list: ["High-protein meal plans", "Progressive overload training", "Strength focus"],
    schedule: ["Upper-Lower (4 days a week)", "Upper-Lower-Push-Pull-Legs (5 days a week)", "Push-Pull-Legs (6 days a week)"],
  },
  {
    img: Recomp_img,
    title: "Recomposition",
    text: "A balance between muscle gain and fat loss.",
    list: ["Macronutrient tracking", "Resistance training", "Body recomposition focus"],
    schedule: ["Upper-Lower (4 days a week)", "Upper-Lower-Push-Pull-Legs (5 days a week)", "Push-Pull-Legs (6 days a week)"],
  }
];

function GymPlans() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container className="py-5" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-4">Choose Your Fitness Plan</h2>
      {plans.map((plan, index) => (
        <Card key={index} className="mb-4 shadow-lg" style={{ overflow: "hidden" }}>
          <Row className="g-0 align-items-center">
            <Col md={3}>
              <Card.Img
                src={plan.img}
                style={{ width: "100%", height: "auto", maxHeight: "250px", objectFit: "contain", borderRadius: "8px" }}
              />
            </Col>
            <Col md={6} className="p-3">
              <Card.Body>
                <Card.Title className="fw-bold fs-4">{plan.title}</Card.Title>
                <Card.Text className="text-muted">{plan.text}</Card.Text>
                <ul className="mb-2">
                  {plan.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <Button variant="primary" onClick={() => toggleExpand(index)}>
                  {expandedIndex === index ? "Show Less" : "Read More"}
                </Button>
              </Card.Body>
            </Col>
          </Row>
          <Collapse in={expandedIndex === index}>
            <div className="p-4 bg-light">
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
