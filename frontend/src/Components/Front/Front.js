import React from "react";
import "./Front.css";
import { Button } from "reactstrap";

function Front() {
  return (
    <div>
      <header id="header-front" className="fixed-top ">
        <div className="container d-flex align-items-center">
          {/* <h1 className="logo mr-auto">Student</h1> */}
          <div className="d-lg-flex login-button">
            <Button
              outline
              color="secondary"
              href="/login"
              className="btn-get-started scrollto"
            >
              Student
            </Button>
            <Button
              outline
              color="secondary"
              href="/admin_login"
              className="get-started-btn scrollto"
            >
              Admin
            </Button>
          </div>
        </div>
      </header>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <h5 className="quote">
            "There is no elevator to success. You have to take stairs."
          </h5>
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1 row-student"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <h5>Welcome to, </h5>
              <h1>Student Buddy</h1>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay={200}
            >
              <img
                src="../img/hero-img.png"
                className="img-fluid img-animate"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Front;
