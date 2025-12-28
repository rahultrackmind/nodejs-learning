import { Router } from "express";
import { registerUser } from "../controllers/user/register.controller.js";
import { loginUser } from "../controllers/user/login.controller.js";
import { logoutUser } from "../controllers/user/logout.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user/refreshAccessToken.controller.js";
import { resetPassword } from "../controllers/user/resetPassword.controller.js";
import { getCurrentLoggedInUser } from "../controllers/user/currentLoggedInUser.controller.js";
import { updateProfile } from "../controllers/user/updateProfile.controller.js";
import { updateUserAvatar } from "../controllers/user/updateUserAvatar.controller.js";
import { updateUserCoverImage } from "../controllers/user/updateUserCoverImage.controller.js";
import { getUserChannelProfile } from "../controllers/user/userChannelProfile.controller.js";
import { getWatchHistory } from "../controllers/user/userWatchHistory.controller.js";
const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser);

router.route("/login").post(loginUser);
router.route("/logout").get(authUser, logoutUser);
router.route("/refreshAccessToken").get(refreshAccessToken);
router.route('/resetPassword').post(authUser, resetPassword);
router.route('/loggedInUser').get(authUser, getCurrentLoggedInUser);
router.route('/updateProfile').put(authUser, updateProfile);
router.route('/updateUserAvatar').patch(authUser, upload.single("avatar"), updateUserAvatar)
router.route('/updateUserCoverImage').patch(authUser, upload.single("coverImage"), updateUserCoverImage);
router.route('/channel/:username').get(authUser, getUserChannelProfile);
router.route('/watchHistory').get(authUser, getWatchHistory);
export default router;