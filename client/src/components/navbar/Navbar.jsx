import React, { useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

const Navbar = () => {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const dispatch = useDispatch();

  async function handleLogoutClick() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Navbar">
      <div className="container">
        {/* <h2 className="banner hover-link" onClick={()=> navigate("/")} >Social Hub</h2> */}
        <img
          src="https://res.cloudinary.com/dnjfxl6t2/image/upload/v1727668295/Social-removebg_okxy87.png"
          onClick={() => navigate("/")}
          style={{ width: "180px" }}
          className="banner hover-link"
          alt="logo"
        />
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />{" "}
          </div>
          <div className="logout hover-link" onClick={handleLogoutClick}>
            <IoMdLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
