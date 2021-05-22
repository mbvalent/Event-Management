import React, { useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { v4 as uuidv4 } from "uuid";
import app from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { useRef } from "react";
import { useEffect } from "react";

const AddEvent = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const nameRef = useRef();

  const [error, setError] = useState("");

  const ref = app.firestore().collection("event");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const validationRules = (newEvent) => {
    if (
      newEvent.name === "" ||
      newEvent.selectedDate === "" ||
      newEvent.totalSeats === "" ||
      newEvent.price === ""
    ) {
      return true;
    }
    return false;
  };

  // CREATE FUNCTION
  function addEvent(newEvent) {
    newEvent.selectedDate = String(newEvent.selectedDate);
    if (validationRules(newEvent)) {
      window.scrollTo(0, 0);
      return setError("Please Fill Required Fields (*)");
    }
    console.log("this is date" + String(newEvent.selectedDate));
    console.log("this is date format: " + typeof newEvent.selectedDate);
    setLoading(true);
    ref
      .doc(newEvent.id)
      .set(newEvent)
      .then(() => {
        setLoading(false);
        // setEvents((prev) => [newEvent, ...prev]);
        setError("");
        toast.success("Event Added Successfully!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.getElementById("rest-form").reset();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Error Adding Event!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  let check = null;
  if (currentUser) {
    if (process.env.REACT_APP_ADMIN_ID !== currentUser.email) {
      check = <Redirect to="/home" />;
    }
  }

  return (
    <div>
      {check}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />

      <h1 style={{ marginTop: "100px" }} className="text-center display-4">
        ADD EVENT
      </h1>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          marginTop: "5px",
          marginBottom: "100px",
          minHeight: "100vh",
        }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Link className="mb-2 btn btn-lg btn-light" to="/home">
            <i className="far fa-hand-point-left"></i> Back to Events
          </Link>
          <Card className="rounded shadow bg-light">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <form id="rest-form">
                <div className="form-outline mt-2 mb-3">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    ref={nameRef}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label className="mt-1 form-label">Event Name*</label>
                </div>

                <div className="row mb-3">
                  <div className="ml-3 mr-5 form-outline">
                    <DatePicker
                      className="form-control"
                      selected={selectedDate}
                      dateFormat="Pp"
                      timeIntervals={15}
                      minDate={new Date()}
                      isClearable
                      showTimeSelect
                      timeFormat="p"
                      // showYearDropdown
                      // scrollableMonthYearDropdown
                      required
                      onChange={(date) => setSelectedDate(date)}
                    />
                    <label className="d-block mt-1 form-label">
                      Date & Time*
                    </label>
                  </div>
                  <div className="ml-3 d-inline mr-3 form-outline">
                    <input
                      type="number"
                      id="form6Example2"
                      className="form-control"
                      min="0"
                      required
                      onChange={(e) => setTotalSeats(e.target.value)}
                    />
                    <label className="mt-1 form-label">Total Seats*</label>
                  </div>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label className="mt-1 form-label">Image</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="number"
                    min="0"
                    id="form6Example6"
                    required
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="mt-1 form-label">Price* ($)</label>
                </div>

                <div className="form-outline mb-3">
                  <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label className="mt-1 form-label">Description</label>
                </div>
              </form>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-3"
                onClick={() =>
                  addEvent({
                    name,
                    description,
                    id: uuidv4(),
                    image,
                    price,
                    selectedDate,
                    totalSeats: parseInt(totalSeats),
                  })
                }
                disabled={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Add Event"
                )}
              </button>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default AddEvent;
