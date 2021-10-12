import React, { useState } from "react";
import { Route } from "react-router-dom";
import { ListGroup, Collapse } from "react-bootstrap";
import Logo from "@/static/logo.png";

const Sidebar = ({ children }) => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  return (
    <div class="sidebar">
      <img className="logo" src={Logo} />
      <div className="menu">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" onClick={() => setOpen1(!open1)}>
              <i class="fas fa-caret-right"></i>
              <i class="fas fa-folder"></i>
              <span>Workspaces</span>
            </a>
            <Collapse in={open1}>
              <ul class="nav nav-pills">
                <li class="nav-item active">
                  <a class="nav-link">
                    <i class="fas fa-folder"></i>
                    <span>My Space</span>
                  </a>
                </li>
              </ul>
            </Collapse>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => setOpen2(!open2)}>
              <i class="fas fa-caret-right"></i>
              <i class="fas fa-folder"></i>
              <span>Ownd By me</span>
            </a>
            <Collapse in={open2}>
              <ul class="nav nav-pills">
                <li class="nav-item active">
                  <a class="nav-link">
                    <i class="fas fa-folder"></i>
                    <span>My Space</span>
                  </a>
                </li>
              </ul>
            </Collapse>
          </li>
          <li class="nav-item active">
            <a class="nav-link">
              <i class="fas fa-cog"></i>
              <span>Setting</span>
            </a>
          </li>
        </ul>
      </div>
      <hr />
      {/* <ul class="nav nav-pills">
        <li class="nav-item active">
          <a class="nav-link active">toggle</a>
        </li>
      </ul> */}
    </div>
  );
};

export default Sidebar;
