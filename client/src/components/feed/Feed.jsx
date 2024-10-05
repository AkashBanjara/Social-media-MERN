import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../post/Post";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../redux/slices/feedSlice";
import { getUserProfile } from "../redux/slices/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedReducer.feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  console.log('Aakash');


  return (
    <div className="Feed ">
      <div className="container">
        <div className="left-part">
          {feedData?.posts?.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">
              {feedData?.followings?.length > 0 ? "You are following" : ""}
            </h3>
            {feedData?.followings?.map((user) => (
              <Follower key={Math.random()} user={user} />
            ))}
          </div>
          <div className="suggestions">
            <h3 className="title">People's you may know</h3>
            {feedData?.suggestions?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
