import React from "react";
import HomeCard from "./HomeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fatloss_img from "./image/Fatloss.jpg";
import Recomp_img from "./image/Recomp.jpg";
import Weight_gain_img from "./image/weight_gain.jpg";
import Cardio_img from "./image/Cardio.jpg";
import ResponsiveAppBar from "./ResponsiveAppBar"

const plans = [
  {
    title: "Weight Loss",
    list: ["Calorie Deficit", "Nutrition", "Exercise"],
    description:
      "Weight loss occurs by creating a calorie deficit through diet, exercise, and lifestyle changes. Sustainable weight loss involves healthy eating, regular physical activity, proper sleep, and stress management for long-term success.",
    image: Fatloss_img,
  },
  {
    title: "Weight Gain",
    list: ["Calorie Surplus", "Strength Training", "Progressive Overload"],
    description:
      "Weight gain occurs when calorie intake exceeds expenditure, leading to fat or muscle accumulation. It can result from overeating, lack of exercise, hormonal imbalances, or intentional muscle-building through diet and strength training.",
    image: Weight_gain_img,
  },
  {
    title: "Recomposition",
    list: ["Calorie Balance", "Protein Intake", "Recovery"],
    description:
      "Body recomposition focuses on losing fat while gaining muscle simultaneously through strength training, protein-rich nutrition, and a slight calorie deficit or maintenance, prioritizing muscle preservation over pure weight loss.",
    image: Recomp_img,
  }
];

export default function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "100px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Container>
        <ResponsiveAppBar/>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Welcome to Your Fitness Tracker
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            maxWidth: "600px",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          Choose a plan and achieve your fitness goals with structured workouts
          and proper nutrition.
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#444",
            marginBottom: "20px",
          }}
        >
          Plans
        </h2>

        <Row className="justify-content-center">
          {plans.map((plan, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={4}
              style={{ marginBottom: "20px" }}
            >
              <HomeCard
                title={plan.title}
                text={plan.description}
                img={plan.image}
                list0={plan.list[0]}
                list1={plan.list[1]}
                list2={plan.list[2]}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
