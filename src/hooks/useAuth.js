import { useState } from "react";
import { useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const useAuth = (props) => {
  let history = useHistory();
  const store = useStore();
  const { global } = store.getState();
  return {};
};

export default useAuth;
