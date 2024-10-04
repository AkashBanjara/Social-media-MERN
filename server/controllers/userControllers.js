const Post = require("../models/Post");
const User = require("../models/User");
const { post } = require("../routers/postsRouter");
const { error, success } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");
const cloudinary = require("cloudinary").v2;

const followOrUnfollowUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (curUserId === userIdToFollow) {
      return res.send(error(409, "users cannot follow themself"));
    }

    if (!userToFollow) {
      res.send(error(500, "user to follow not found"));
    }

    if (curUser.followings.includes(userIdToFollow)) {
      //already following
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUserId);
      userToFollow.followers.splice(followerIndex, 1);

      await userToFollow.save();
      await curUser.save();
      return res.send(success(200, "user unfollowed"));
    } else {
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);

      await curUser.save();
      await userToFollow.save();
      // return res.send(success(200, "User followed"));

      return res.send(success(200, { user: userToFollow }));
    }
  } catch (err) {

    res.send(error(500, err.message));
  }
};

const getPostOffFollowing = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId).populate("followings");

    const fullPosts = await Post.find({
      owner: {
        $in: curUser.followings,
      },
    }).populate("owner");

    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();
    curUser.posts = posts;

    const followingIds = curUser.followings.map((item) => item._id);
    followingIds.push(curUserId);

    const suggestions = await User.find({
      _id: {
        $nin: followingIds,
      },
    });

    return res.send(success(200, { ...curUser._doc, suggestions, posts }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);

    const posts = await Post.find({
      owner: curUser,
    }).populate("likes");

    return res.send(success(200, posts));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.send(error(409, "UserId is required"));
    }

    const posts = await Post.find({
      owner: userId,
    }).populate("likes");

    if (!posts || post.length === 0) {
      return res.send(error(404, "No post found for this user"));
    }

    return res.send(success(200, posts));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//deleting user profile
const deleteMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;
    // const curUser = await User.findById(curUserId);

    //delete users post and or other data
    await Post.deleteMany({ owner: curUserId });

  

    //! remove mySelf from following's followers
    await User.updateMany(
      { followers: curUserId },
      { $pull: { followers: curUserId } },
    );

    
    //! remove mySelf from follwer's following
    await User.updateMany(
      { followings: curUserId },
      { $pull: { followings: curUserId } },
    );

    //! remove myself form all likes
    await Post.updateMany(
      { likes: curUserId },
      { $pull: { likes: curUserId } },
    );
    await User.findByIdAndDelete(curUserId);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "User profile deleted successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

//getting user info

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    return res.send(success(200, { user }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, userImg } = req.body;

    const user = await User.findById(req._id);

    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg, {
        folder: "profileImg",
      });

      user.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };
    }

    await user.save();
    return res.send(success(200, { user }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPosts = user.posts;
    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse(); //to get photos newer to older
    return res.send(success(200, { ...user._doc, posts }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

module.exports = {
  followOrUnfollowUser,
  getPostOffFollowing,
  getMyPosts,
  getUserPosts,
  deleteMyProfile,
  getMyInfo,
  updateUserProfile,
  getUserProfile,
};
