import React from "react";
import { Card, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./StatusCard.css";

function StatusCard(props) {
  return (
    <Row className="row-all">
      <Col sm="4" className="profile-card ">
        <Card body className="status-card">
          <div className="text-center">
            <h3>Name: {props.name}</h3>
            <div className="h5 mt-4">
              <i className="ni business_briefcase-24 mr-2" />
              Status : {props.status}
            </div>
          </div>

          <Link
            to={{
              pathname: `/test/${props.id}`,
            }}
          >
            <Button className="float-right" color="default" size="sm">
              View Details
            </Button>
          </Link>
        </Card>
      </Col>
    </Row>
  );
}

export default StatusCard;
