import React from "react";
import { Route } from "react-router-dom";
import Siderbar from "@/components/sidebar";
import Header from "@/components/header";

function DefaultLayout({ layout, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="wrapper">
          <div className="sider">
            <Siderbar />
          </div>
          <div className="main">
            <Header />
            <component />
          </div>
        </div>
      )}
    />
  );
}

export default DefaultLayout;
