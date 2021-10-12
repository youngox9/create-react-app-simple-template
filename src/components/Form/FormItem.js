import React from "react";
import { Form, Button, Row, FloatingLabel } from "react-bootstrap";

const Header = ({ children, form = {}, errors = {}, fieldKey = "" }) => {
  return (
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
      <Form.Control.Feedback type="invalid">
        {errors.firstName}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Header;
