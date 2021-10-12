import axios from "axios";
import store from "@/store";
import { setLoading } from "@/reducers/main";
const { dispatch } = store;

const isDev = process.env.NODE_ENV === "development";
const PRD_API_URL = window.location.origin + "/docaptures/api/";
const BASE_URL = isDev ? "/api/" : PRD_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { common: {} },
});
instance.defaults.headers.common["Authorization"] =
  sessionStorage.getItem("token");

instance.defaults.headers["Content-Type"] = "application/json";

instance.interceptors.request.use(
  function (config) {
    dispatch(setLoading(true));
    return config;
  },
  function (error) {
    dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("123");
    dispatch(setLoading(false));
    return response?.data ? response.data : response;
  },
  function (error) {
    dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default instance;
