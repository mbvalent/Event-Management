import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  console.log(event.id);
  return (
    <div>
      <Container>
        <Card className="my-3 p-3 border-0 rounded shadow p-3 mb-5 bg-light rounded">
          <Link to={`/view-event/${event.id}`}>
            <Card.Img variant="top" src={event.image} />
          </Link>
          <hr />
          <Card.Body>
            <Link to={`/view-event/${event.id}`}>
              <Card.Title className="text-info">{event.name}</Card.Title>
            </Link>
            <Card.Text as="div">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              dictum porta dolor in sagittis.
            </Card.Text>
            <Card.Text className="mt-3" as="h3">
              Rs. {event.price}/-
            </Card.Text>
            <hr />
            <Link
              to={`/book-event/${event.id}`}
              className="btn btn-success shadow mt-3"
            >
              Book Event
            </Link>
            <Link
              to={`/view-event/${event.id}`}
              className="btn btn-secondary float-right shadow mt-3"
            >
              View Event
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Event;
