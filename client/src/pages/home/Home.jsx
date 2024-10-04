import React, { useEffect } from "react";
import { axiosClient } from "../../utils/axiosClient";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../components/redux/slices/appConfigSlice";


const Home = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getMyInfo())
  },[])

  return (
    <>
      <Navbar />
      <div className="outlet" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
