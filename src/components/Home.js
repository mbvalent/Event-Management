import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Home = () => {
  return (
    <div>
      <Header />

      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10 align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold">
                Lorem ipsum dolor sit amet consectetur adipiscing
              </h1>
              <hr className="divider my-4" />
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-success text-white-75 font-weight-light mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                dictum porta dolor in sagittis
              </p>

              <Link
                to="/events"
                className="btn btn-lg rounded-pill btn-warning border-0"
              >
                Book Event
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contact */}
      <section className="bg-light page-section" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0">Let's Get In Touch!</h2>
              <hr className="divider my-4" />
              <p className="text-muted mb-5">
                Ready to start your next event with us? Give us a call or send
                us an email and we will get back to you as soon as possible!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
              <div>+91 7366661235</div>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
              {/* <!-- Make sure to change the email address in BOTH the anchor text and the link target below!--> */}
              <a className="text-success d-block" href="mailto:">
                contact@event.io
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import Product from "./Product";

// const HomeScreen = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // const fetchProducts = async () => {
//     //   const { data } = await axios.get("/api/products");
//     //   setProducts(data);
//     // };
//     // fetchProducts();
//   }, []);

//   return (
//     <>
//       <h1>Latest Products</h1>
//       <Row>
//         {products.map((product) => (
//           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//             <Product product={product} />
//           </Col>
//         ))}
//       </Row>
//       <div classNameName="shadow-lg p-3 mb-5 bg-white rounded">
//         <h1>effect5</h1>
//       </div>
//     </>
//   );
// };

// export default HomeScreen;
