import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Siderbar from "@/components/sidebar";
import Header from "@/components/header";
import useAuth from "@/hooks/useAuth";
import axios from "@/utils/axios";

import { setSharedWorkspaces, setOwnedWorkspaces } from "@/reducers/global";

function DefaultLayout({ layout, component: Component, ...rest }) {
  const dispatch = useDispatch();
  useAuth();
  useEffect(() => {
    getSharedWorkspaces();
    getOwnedWorkspaces();
  }, []);

  async function getSharedWorkspaces() {
    try {
      const { data } = await axios({
        url: `/fore/users/sharedWorkspaces`,
        method: "GET",
      });
      dispatch(setSharedWorkspaces(data));
    } catch (e) {
      console.log(">>>>>", e);
    }
  }

  async function getOwnedWorkspaces() {
    try {
      const { data } = await axios({
        url: `/fore/users/ownedWorkspaces`,
        method: "GET",
      });
      dispatch(setOwnedWorkspaces(data));
    } catch (e) {
      console.log(">>>>>", e);
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="wrapper">
          <div className="sider">
            <Siderbar />
          </div>
          <div className="container">
            <Header />
            <Component />
          </div>
        </div>
      )}
    />
  );
}

export default DefaultLayout;
