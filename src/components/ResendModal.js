import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Modal, Form, Button } from "react-bootstrap";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

function SignupModal(props) {
  const [form, setForm] = useState({});
  const { isOpen, onClose = () => {} } = props;

  function onFormChange(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }
  async function onSignUp() {}
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      scrollable={true}
      centered={true}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={schema}
          values={form}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting }) => {
            onSignUp();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form className="form">
              <Form.Group>
                <div className="row">
                  <div class="col mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={form.firstName}
                      placeholder=" "
                      onChange={(e) =>
                        onFormChange("firstName", e.target.value)
                      }
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
                    />
                  </div>
                  <div class="col col-12 mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={form.email}
                      placeholder=" "
                      onChange={(e) => onFormChange("email", e.target.value)}
                    />
                  </div>
                  <div class="col col-6 mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      size="sm"
                      type="phone"
                      value={form.phone}
                      placeholder=" "
                      onChange={(e) => onFormChange("phone", e.target.value)}
                    />
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
                        onChange={(e) => onFormChange("sex", 0)}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="sex"
                        id="female"
                        type="radio"
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
                    />
                  </div>
                  <div class="col col-12">
                    <Form.Label>Comfirm Password</Form.Label>
                    <Form.Control
                      size="sm"
                      type="password"
                      value={form.password2}
                      placeholder=" "
                      onChange={(e) =>
                        onFormChange("password2", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSignUp}>
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
