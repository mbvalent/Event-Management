import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark py-5">
      <div className="container">
        <div className="small text-center text-muted">
          Copyright &copy;
          <script>document.write(new Date().getFullYear());</script>- Event.io
        </div>
      </div>
    </footer>
  );
};

export default Footer;
