import React, { useState } from "react";
import { connect } from "react-redux";

import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "@/utils/axios";
import useForm from "@/hooks/useForm";

function SignupModal(props) {
  const [form, setForm] = useState({
    email: "",
  });

  const { errors, isTouched, setTouched, isValid } = useForm({ form });

  const { isOpen, onClose = () => {} } = props;

  function onFormChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  async function onSubmit() {
    setTouched(true);
    if (isValid) {
      try {
        const res = await axios({
          url: "/auth/resendRegistry",
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
        <Modal.Title>Forget Password?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Please enter your registered email address, and we'll send you a link
          to reset your password.
        </p>
        <Form className="form">
          <div className="row">
            <div class="col col-12">
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
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit}>
          Sign In
        </Button>
        <Button variant="outlined-dark" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect()(SignupModal);
