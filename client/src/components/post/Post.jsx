import React, { useEffect } from "react";
import "./Post.scss";
import Avatar from "../avatar/Avatar";
import { IoIosHeartEmpty } from "react-icons/io";

import { IoIosHeart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { getUserProfile, likeAndUnlike } from "../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePostLike() {
    dispatch(
      likeAndUnlike({
        postId: post._id,
      }),
    );
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLike}>
          {post?.isLiked ? (
            <IoIosHeart className="icon" style={{ color: "red" }} />
          ) : (
            <IoIosHeartEmpty className="icon" />
          )}

          <h4>{`${post?.likesCount || 0} Likes`} </h4>
        </div>
        <p className="caption">{post?.caption} </p>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
};

export default Post;
