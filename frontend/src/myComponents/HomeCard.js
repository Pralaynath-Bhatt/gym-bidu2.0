import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function HomeCard(props) {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.text}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
      <ListGroup.Item><b>Factors</b></ListGroup.Item>
        <ListGroup.Item>{props.list0}</ListGroup.Item>
        <ListGroup.Item>{props.list1}</ListGroup.Item>
        <ListGroup.Item>{props.list2}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;