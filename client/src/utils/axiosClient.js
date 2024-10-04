import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../components/redux/Store"; //to dispatch toast
import { setLoading, showToast } from "../components/redux/slices/appConfigSlice";
import { TOAST_FALIURE } from "../App";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
  //if we don't add withcredentials then backend not sent cookies to frontend
  withCredentials: true,
});


axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  store.dispatch(setLoading(true));
  return request;
});


axiosClient.interceptors.response.use(
  async (response) => {
    store.dispatch(setLoading(false))
    const data = response.data;
    if (data.status === "ok") {
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(
      showToast({
        type: TOAST_FALIURE,
        message: error,
      }),
    );

    if (
      //when refresh token is expire, send user to login page
      statusCode === 401 &&
      originalRequest.url ===
        `${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) {
      //means acces token has expired
      originalRequest._retry = true;
      // const response = await axios.get("/auth/refresh")
      // console.log('response from backend: ', response)

      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/refresh`);

      if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;

        return axios(originalRequest);
      } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
  async (error) => {
    store.dispatch(setLoading(true))
    store.dispatch(
      showToast({
        type: TOAST_FALIURE,
        message: error.message,
      }),
    );
    return Promise.reject(error);
  },
);
