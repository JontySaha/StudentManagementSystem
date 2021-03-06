import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import GoogleLogin from "./GoogleLogin";
import "./Login.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    const cookies = new Cookies();

    axios
      .post("http://localhost:9000/login/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log("login response: ");
        console.log(response);
        console.log(response.data);
        cookies.set("userid", response.data.userid, { path: "/" });
        cookies.set("username", response.data.username, { path: "/" });
        console.log(cookies.get("userid"));
        console.log(cookies.get("username"));

        if (response.status === 200) {
          this.setState({
            redirectTo: "/welcome",
          });
        }
      })
      .catch((err) => {
        this.setState({ errorMessage: "Username or password is incorrect" });
      });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <>
          <div className="loginpage">
            <Col className="logincontainer" lg="5" md="7">
              <Card className="bg-secondary-login shadow border-0-login">
                <CardHeader className="bg-transparent-login pb-5-login">
                  <div className="text-muted-login text-center-login mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <GoogleLogin />
                </CardHeader>
                {this.state.errorMessage && (
                  <p className="error"> {this.state.errorMessage} </p>
                )}
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center-login text-muted-login mb-4-login">
                    <small>Or sign in with credentials</small>
                  </div>

                  <Form role="form" onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-3-login">
                      <InputGroup className="input-group-alternative-login">
                        <Input
                          placeholder="Email"
                          type="email"
                          value={this.state.username}
                          onChange={(event) =>
                            this.setState({
                              username: event.target.value,
                            })
                          }
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative-login">
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({
                              password: event.target.value,
                            })
                          }
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button type="submit" value="Submit" color="primary">
                      Login
                    </Button>

                    {/* <div className="text-center-login">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={this.handleSubmit}
                      >
                        Sign in
                      </Button>
                    </div> */}
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col className="text-right" xs="6">
                  <a className="text-light" href="/register">
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </div>
        </>
      );
    }
  }
}

export default Login;
