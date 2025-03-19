import React from 'react'
import HomeCard from "./HomeCard"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fatloss_img from "./image/Fatloss.jpg";
import Recomp_img from "./image/Recomp.jpg";
import Weight_gain_img from "./image/weight_gain.jpg";
import Cardio_img from "./image/Cardio.jpg"
const plans = [
  {title:"Weight-loss",list:["Calorie Deficit", "Nutrition","Exercise"],discription:"Weight loss occurs by creating a calorie deficit through diet, exercise, and lifestyle changes. Sustainable weight loss involves healthy eating, regular physical activity, proper sleep, and stress management for long-term success.",image:Fatloss_img},
  {title:"Weight-gain",list:["Calorie Surplus", "Strength Training","Progressive Overload"],discription:"Weight gain occurs when calorie intake exceeds expenditure, leading to fat or muscle accumulation. It can result from overeating, lack of exercise, hormonal imbalances, or intentional muscle-building through diet and strength training.",image:Weight_gain_img},
  {title:"Recomposition",list:["Calorie Balance", "Protein Intake","Recovery"],discription:"Body recomposition focuses on losing fat while gaining muscle simultaneously through strength training, protein-rich nutrition, and a slight calorie deficit or maintenance, prioritizing muscle preservation over pure weight loss.",image:Recomp_img},
  {title:"Cardio",list:["Endurance", "Stamina","Sweat"],discription:"Cardio exercises improve heart health and burn calories. Examples include running, cycling, swimming, jumping rope, and HIIT. They enhance endurance, boost metabolism, and support weight loss by increasing heart rate and oxygen consumption.",image:Cardio_img}
]
export default function Home() {
  return (
    <div >
      <h1>Welcome to a complete Fitness tracker</h1>
      <p>Here we have designed plans for you to get your fitness goals</p>
      <Container >
        <h2 style={{ textAlign: "center" }}>Plans</h2>
      <Row>
        <Col><HomeCard title={plans[0].title} text={plans[0].discription} img={plans[0].image} list0={plans[0].list[0]} list1={plans[0].list[1]} list2={plans[0].list[2]}/></Col>
        <Col><HomeCard title={plans[1].title} text={plans[1].discription} img={plans[1].image} list0={plans[1].list[0]} list1={plans[1].list[1]} list2={plans[1].list[2]}/></Col>
      </Row>
      <Row>
        <Col><HomeCard title={plans[2].title} text={plans[2].discription} img={plans[2].image} list0={plans[2].list[0]} list1={plans[2].list[1]} list2={plans[2].list[2]}/></Col>
        <Col><HomeCard title={plans[3].title} text={plans[3].discription} img={plans[3].image} list0={plans[3].list[0]} list1={plans[3].list[1]} list2={plans[3].list[2]}/></Col>
      </Row>
    </Container>
    </div>
  )
}
