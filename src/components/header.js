import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Popover, OverlayTrigger, ListGroup } from "react-bootstrap";
import { clearAuth } from "@/reducers/global";

const Header = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <ListGroup>
          <ListGroup.Item onClick={onSignout}>log out</ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  function onSignout() {
    dispatch(clearAuth());
    history.push("/login");
  }
  return (
    <div class="header d-flex justify-content-end">
      <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
        <Button variant="clear">
          <i class="fas fa-user-circle"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default Header;
