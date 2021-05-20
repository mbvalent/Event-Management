import React, { useState } from "react";
// import {useMemo} from 'react';
import { Card, Container, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
// import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import app from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../contexts/AuthContext";

// const baseStyle = {
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: "20px",
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: "#eeeeee",
//   borderStyle: "dashed",
//   backgroundColor: "#fafafa",
//   color: "#bdbdbd",
//   outline: "none",
//   transition: "border .24s ease-in-out",
// };

// const activeStyle = {
//   borderColor: "#2196f3",
// };

// const acceptStyle = {
//   borderColor: "#00e676",
// };

// const rejectStyle = {
//   borderColor: "#ff1744",
// };

const AddEvent = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);

  const ref = app.firestore().collection("event");

  // CREATE FUNCTION
  function addEvent(newEvent) {
    newEvent.selectedDate = String(newEvent.selectedDate);
    console.log("this is date" + String(newEvent.selectedDate));
    console.log("this is date format: " + typeof newEvent.selectedDate);
    setLoading(true);
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newEvent.id)
      .set(newEvent)
      .then(() => {
        setLoading(false);
        // setEvents((prev) => [newEvent, ...prev]);
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

  // const {
  //   isDragActive,
  //   isDragAccept,
  //   isDragReject,
  //   acceptedFiles,
  //   getRootProps,
  //   getInputProps,
  // } = useDropzone({ accept: "image/*" });

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isDragActive ? activeStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isDragActive, isDragReject, isDragAccept]
  // );

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
            <i className="far fa-hand-point-left"></i> Go Back
          </Link>
          <Card className="rounded shadow bg-light">
            <Card.Body>
              <form id="rest-form">
                {/* <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example1"
                        className=" form-control"
                      />
                      <label className=" form-label" for="form6Example1">
                        Event name
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form6Example2"
                        className="form-control"
                      />
                      <label className="form-label" for="form6Example2">
                        Last name
                      </label>
                    </div>
                  </div>
                </div> */}

                <div className="form-outline mb-3">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label className="mt-1 form-label" for="form6Example3">
                    Event Name*
                  </label>
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
                      onChange={(date) => setSelectedDate(date)}
                    />
                    <label
                      className="d-block mt-1 form-label"
                      for="form6Example1"
                    >
                      Date & Time*
                    </label>
                  </div>
                  <div className="ml-3 d-inline mr-3 form-outline">
                    <input
                      type="number"
                      id="form6Example2"
                      className="form-control"
                      min="0"
                      onChange={(e) => setTotalSeats(e.target.value)}
                    />
                    <label className="mt-1 form-label" for="form6Example2">
                      Total Seats
                    </label>
                  </div>
                </div>

                {/* <section>
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <label className="form-label" for="form6Example5">
                    Image
                  </label>
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </section> */}

                <div className="form-outline mb-3">
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label className="mt-1 form-label" for="form6Example5">
                    Image
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="number"
                    min="0"
                    id="form6Example6"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="mt-1 form-label" for="form6Example6">
                    Price ($)
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label className="mt-1 form-label" for="form6Example7">
                    Description
                  </label>
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
