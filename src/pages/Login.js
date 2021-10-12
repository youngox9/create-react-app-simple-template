import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Row, FloatingLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "@/static/logo.png";
import axios from "@/utils/axios";
import SignupModal from "@/components/SignupModal";
import useForm from "@/hooks/useForm";

function Login() {
  let history = useHistory();

  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const [remember, setRemember] = useState(Cookies.get("remember") || false);

  const [form, setForm] = useState({
    email: "plustek.notify@msa.hinet.net",
    password: "123456",
  });

  const { errors, isTouched, setTouched, isValid } = useForm({ form });

  useEffect(() => {
    if (remember) {
      Cookies.set("remember", form.remember, { expires: 7 });
      Cookies.set("email", form.email, { expires: 7 });
      Cookies.set("password", form.password, { expires: 7 });
    } else {
      Cookies.remove("remember");
      Cookies.remove("email");
      Cookies.remove("password");
    }
  }, [remember]);

  async function login() {
    setTouched(true);

    if (isValid) {
      try {
        const res = await axios({
          url: "/auth/login",
          method: "POST",
          data: {
            ...form,
          },
          withToken: false,
        });
        history.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function fastLogin() {
    setForm({
      email: "plustek.notify@msa.hinet.net",
      password: "123456",
    });
    login();
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
          <img className="logo" src={Logo} alt="" />
          <Form className="form">
            <h4 className="text-center mb-4">Welcom to doCaptures!</h4>
            <Form.Group className="mb-3">
              <FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={(e) => onFormChange("email", e.target.value)}
                  isInvalid={isTouched && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Password">
                <Form.Control
                  size="sm"
                  type="password"
                  placeholder=" "
                  value={form.password}
                  onChange={(e) => onFormChange("password", e.target.value)}
                  isInvalid={isTouched && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <div className="d-grid gap-2">
              <div className="d-flex justify-content-between">
                <Form.Group>
                  <Form.Check
                    id="remember_me"
                    type="checkbox"
                    label="Remember Me"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                </Form.Group>
                <a className="text-right">Forget Password?</a>
              </div>
              <Button variant="primary" type="submit" onClick={login}>
                Sign Up
              </Button>
              <p className="text-center">
                Don't have account?{" "}
                <a onClick={() => setIsSignupOpen(true)}>Sign Up</a>
              </p>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col">
                <div className="spacer">
                  <Button
                    className="mg-2"
                    variant="outline-dark"
                    onClick={login}
                  >
                    Google
                  </Button>
                  <Button variant="outline-dark" onClick={login}>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="d-grid gap-2">
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
