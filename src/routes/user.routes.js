import { Router } from "express";
import { registerUser } from "../controllers/user/register.controller.js";
import { loginUser } from "../controllers/user/login.controller.js";
import { logoutUser } from "../controllers/user/logout.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user/refreshAccessToken.controller.js";
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
router.route("/refreshAccessToken").get(refreshAccessToken)

export default router;