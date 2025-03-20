import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function HomeCard({ img, title, text, list0, list1, list2, link, linkText }) {
  return (
    <Card
      style={{
        width: "22rem",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={img}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // Prevents cropping
            backgroundColor: "#f8f9fa", // Light background for transparent images
          }}
        />
      </div>

      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text className="text-muted">{text}</Card.Text>
      </Card.Body>

      <ListGroup variant="flush" className="px-3">
        <ListGroup.Item className="fw-bold bg-light">Factors</ListGroup.Item>
        {list0 && <ListGroup.Item>{list0}</ListGroup.Item>}
        {list1 && <ListGroup.Item>{list1}</ListGroup.Item>}
        {list2 && <ListGroup.Item>{list2}</ListGroup.Item>}
      </ListGroup>

      {link && (
        <Card.Body className="text-center">
          <Card.Link href={link} className="btn btn-primary">
            {linkText || "Learn More"}
          </Card.Link>
        </Card.Body>
      )}
    </Card>
  );
}

export default HomeCard;
