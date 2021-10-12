import { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, FloatingLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Logo from "@/static/logo.png";
// import axios from "axios";
import axios from "@/utils/axios";
import SignupModal from "@/components/SignupModal";

function Login() {
  let history = useHistory();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [form, setForm] = useState({
    email: "plustek.notify@msa.hinet.net",
    password: "123456",
  });

  async function login() {
    try {
      const res = await axios({
        url: "/auth/login",
        method: "POST",
        data: {
          ...form,
        },
        withToken: false,
      });
    } catch (e) {
      console.log(e);
    }
    history.push("/");
  }

  async function fastLogin() {
    try {
      const res = await axios({
        url: "/api/auth/login",
        method: "POST",
        data: {
          email: "plustek.notify@msa.hinet.net",
          password: "123456",
        },
        withToken: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  function onFormChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  return (
    <>
      <div className="login-container">
        <div className="form-wrap">
          <img className="logo" src={Logo} />
          <Form className="form" onSubmit={login}>
            <h4 class="text-center mb-4">Welcom to doCaptures!</h4>
            <Form.Group controlId="email">
              <FloatingLabel controlId="email" label="Email" className="mb-3">
                <Form.Control
                  id="email"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={(e) => onFormChange("email", e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder=" "
                  value={form.password}
                  onChange={(e) => onFormChange("password", e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <div class="d-grid gap-2">
              <div class="d-flex justify-content-between">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    id="remember"
                    label="Remember Me"
                  />
                </Form.Group>
                <a className="text-right">Forget Password?</a>
              </div>
              <Button variant="primary" type="submit" onClick={login}>
                Submit
              </Button>
              <p className="text-center">
                Don't have account?{" "}
                <a href onClick={() => setIsSignupOpen(true)}>
                  Sign Up
                </a>
              </p>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col">
                <div class="spacer">
                  <Button class="mg-2" variant="outline-dark" onClick={login}>
                    Google
                  </Button>
                  <Button variant="outline-dark" onClick={login}>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
            <hr></hr>
            <div class="d-grid gap-2">
              <Button variant="dark" onClick={fastLogin}>
                Fast Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </>
  );
}

export default connect()(Login);
