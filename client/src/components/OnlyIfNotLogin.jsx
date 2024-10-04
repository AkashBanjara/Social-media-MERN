import React from "react";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

const OnlyIfNotLogin = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  return (
    user ? <Navigate to='/' /> : <Outlet/>
  )
};

export default OnlyIfNotLogin;
