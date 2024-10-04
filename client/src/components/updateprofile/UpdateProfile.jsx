import React, { useEffect, useState } from "react";
import "./updateProfile.scss";
import dummyImg from "/src/assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { updateMyProfile } from "../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url );
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE){
        setUserImg(fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      }),
    );
  }

 async function handleDeleteAccount(){
    try {
      const confirm = window.confirm("Are you sure you want to delete your profile?");
      if(!confirm) return;
      await axiosClient.delete(`/user/`)
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')     
      alert("Profile deleted successfully")      
    } catch (err) {
      alert('Error deleting profile')
      
    }
  }

  return (
    <div className="UpdateProfile"> 
      <div className="container">
        <div className="left-part">
          {/* <img className="user-img" src={userImg} alt="" /> */}
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              {" "}
              <img src={userImg ? userImg : dummyImg} alt={name} />{" "}
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={bio}
              type="text"
              placeholder="Your bio"
              onChange={(e) => setBio(e.target.value)}
            />

            <input
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button onClick={handleDeleteAccount} className="delete-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
