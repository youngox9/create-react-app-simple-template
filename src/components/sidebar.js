import React, { useState } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import { ListGroup, Collapse, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "@/static/logo.png";

const Sidebar = ({ children }) => {
  const global = useSelector((state) => state.global);

  const { ownedWorkspaces, sharedWorkspaces } = global;
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  return (
    <div className="sidebar">
      <img className="logo" src={Logo} />
      <div className="menu">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" onClick={() => setOpen1(!open1)}>
              <i className="fas fa-folder"></i>
              <span>Workspaces</span>

              <div className={`caret ${open1 ? "active" : ""}`}>
                <FontAwesomeIcon icon={["fa", "caret-left"]} />
              </div>
            </a>

            <Collapse in={open1}>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/file">
                    <span>My Space</span>
                  </NavLink>
                </li>
                {ownedWorkspaces.map((obj) => {
                  return (
                    <li className="nav-item">
                      <NavLink className="nav-link" to={`/file/${obj.id}`}>
                        <span>{obj.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setOpen2(!open2)}>
              <i class="fas fa-users"></i>
              <span>Shared Space</span>
              <div className={`caret ${open2 ? "active" : ""}`}>
                <FontAwesomeIcon icon={["fa", "caret-left"]} />
              </div>
            </a>
            <Collapse in={open2}>
              <ul className="nav nav-pills">
                {sharedWorkspaces.map((obj) => {
                  return (
                    <li className="nav-item">
                      <NavLink className="nav-link" to={`/${obj.id}`}>
                        <span>{obj.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </li>
          <hr />
          <li className="nav-item active">
            <a className="nav-link">
              <i className="fas fa-cog"></i>
              <span>Setting</span>
            </a>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
