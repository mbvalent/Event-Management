import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Event from "./Event";
import Header from "./Header";
import app from "../firebase";
import { Spinner } from "react-bootstrap";
import Footer from "./Footer";

// import events from './sampleEvents'

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = app.firestore().collection("event");

  //REALTIME Read FUNCTION
  function getEvents() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setEvents(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div className="text-center spinner">
      <Spinner animation="border" role="status" />
    </div>
  ) : (
    <div>
      {/* {loading ?  : null} */}
      <Header />

      <h1
        style={{ marginTop: "100px" }}
        className="text-info text-center display-4"
      >
        Latest Events
      </h1>

      <Row>
        {events.map((event) => (
          <Col key={event.id} sm={12} md={6} lg={4} xl={3}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
};

export default Events;
