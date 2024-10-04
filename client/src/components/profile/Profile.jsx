import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Post from "../post/Post";
import userImg from "./../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/postSlice";
import { followAndUnfollowUser } from "../redux/slices/feedSlice";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector((state) => state.feedReducer.feedData);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      }),
    );
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId),
    );
  }, [myProfile, params.userId, feedData]);

  function handleUserFollow(){
    dispatch(followAndUnfollowUser({
      userIdToFollow: params.userId
    }))
    setIsFollowing((prev=> !prev))
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyProfile ? <CreatePost /> : ""}

          {/* <Post />
          <Post /> */}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url || userImg} alt="" />

            <h3 className="user-name">{userProfile?.name} </h3>
            <p style={{marginTop:"2px", fontSize:"12px"}}>{userProfile.bio} </p>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4> {`${userProfile?.followings?.length} Following `} </h4>
            </div>
  
            {!isMyProfile && (
              <h5
              style={{margin:'15px'}}
              onClick={handleUserFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary "
                }
              >
                {" "}
                {isFollowing ? "Unfollow" : "Follow"}{" "}
              </h5>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-secondry"
                onClick={() => navigate("/updateProfile")}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
