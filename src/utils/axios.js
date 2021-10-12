import axios from "axios";
import store from "@/store";
import { setLoading } from "@/reducers/global";
import { ToastContainer, toast } from "react-toastify";

const { dispatch } = store;

const isDev = process.env.NODE_ENV === "development";
const PRD_API_URL = window.location.origin + "/docaptures/api/";
const BASE_URL = isDev ? "/api/" : PRD_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { common: {} },
});
instance.defaults.headers["Content-Type"] = "application/json";

instance.interceptors.request.use(
  function (config) {
    const { withToken = true, withLoading = true } = config;

    if (withToken) {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.common["Authorization"] = `${token}`;
      }
    }
    if (withLoading) {
      dispatch(setLoading(true));
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    dispatch(setLoading(false));
    return response?.data ? response.data : response;
  },
  function (e) {
    console.log("error >>>>", e);
    const code = parseInt(e?.response?.status);
    const msg = e?.response?.data?.message || "Network Error";
    toast(msg, {
      type: "error",
    });
    if (code === 401) {
      // redirect({ path: "/login" });
    }
    dispatch(setLoading(false));
    return Promise.reject(e);
  }
);

export default instance;
