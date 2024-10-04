const { followOrUnfollowUser, getPostOffFollowing, getMyPosts, getUserPosts, deleteMyProfile, getMyInfo, updateUserProfile, getUserProfile } = require('../controllers/userControllers');
const requireUser = require('../middlewares/requireUser');

const router = require('express').Router();

router.post("/follow", requireUser, followOrUnfollowUser )
router.get("/getFeedData", requireUser, getPostOffFollowing )
router.get("/getMyPosts", requireUser, getMyPosts )
router.post("/getUserPost", requireUser, getUserPosts )
router.delete("/", requireUser, deleteMyProfile)
router.get("/getMyInfo", requireUser, getMyInfo)
router.put("/", requireUser, updateUserProfile )
router.post("/getUserProfile", requireUser , getUserProfile)

module.exports = router;