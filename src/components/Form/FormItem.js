import React from "react";
import { Form, Button, Row, FloatingLabel } from "react-bootstrap";
import _ from "lodash";

const FormItem = (props) => {
  const {
    children,
    form = {},
    errors = {},
    rules = {},
    fieldKey = "",
    onChange = () => {},
    ...rest
  } = props;

  const value = _.get(fieldKey, form) || "";
  const error = _.get(fieldKey, errors) || "";

  return (
    <Form.Group controlId={fieldKey}>
      {/* <FloatingLabel controlId={fieldKey} label="Email">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          id={fieldKey}
          type="text"
          placeholder=" "
          value={value}
          onChange={onChange}
          {...rest}
        />
      </FloatingLabel> */}
      {children}
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormItem;
