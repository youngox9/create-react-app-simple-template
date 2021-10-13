import React, { useState } from "react";
import { connect } from "react-redux";

import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import useForm from "@/hooks/useForm";

function SignupModal(props) {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    sex: 0,
    phone: "",
    password: "",
    password2: "",
  });

  const { errors, isTouched, setTouched, isValid } = useForm({ form });

  const { isOpen, onClose = () => {} } = props;

  function onFormChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  async function onSignUp() {
    setTouched(true);

    if (isValid) {
      try {
        const res = await axios({
          url: "/auth/signUp",
          method: "POST",
          data: form,
          withToken: false,
        });
        toast("Please check your registered email inbox", {
          type: "success",
        });
        onClose();
      } catch (e) {
        console.log(">>>>>", e);
      }
    }
  }

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      scrollable={true}
      centered={true}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="form">
          <div className="row">
            <div class="col mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={form.firstName}
                placeholder=" "
                onChange={(e) => onFormChange("firstName", e.target.value)}
                isInvalid={isTouched && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </div>
            <div class="col mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={form.lastName}
                placeholder=" "
                onChange={(e) => onFormChange("lastName", e.target.value)}
                isInvalid={isTouched && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </div>
            <div class="col col-12 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={form.email}
                placeholder=" "
                onChange={(e) => onFormChange("email", e.target.value)}
                isInvalid={isTouched && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </div>
            <div class="col col-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                size="sm"
                type="phone"
                value={form.phone}
                placeholder=" "
                onChange={(e) => onFormChange("phone", e.target.value)}
                isInvalid={isTouched && !!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </div>
            <div class="col col-6 mb-3">
              <Form.Label>Sex</Form.Label>
              <div className="align-self-center">
                <Form.Check
                  inline
                  label="Male"
                  name="sex"
                  id="male"
                  type="radio"
                  checked={form.sex === 0}
                  onChange={(e) => onFormChange("sex", 0)}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="sex"
                  id="female"
                  type="radio"
                  checked={form.sex === 1}
                  onChange={(e) => onFormChange("sex", 1)}
                />
              </div>
            </div>
            <div class="col col-12 mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                value={form.password}
                placeholder=" "
                onChange={(e) => onFormChange("password", e.target.value)}
                isInvalid={isTouched && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </div>
            <div class="col col-12">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                value={form.password2}
                placeholder=" "
                onChange={(e) => onFormChange("password2", e.target.value)}
                isInvalid={isTouched && !!errors.password2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password2}
              </Form.Control.Feedback>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSignUp}>
          Sign Up
        </Button>
        <Button variant="outlined-dark" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect()(SignupModal);
