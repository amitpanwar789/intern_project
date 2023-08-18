import express from "express";
import {
  authUser,
  registerUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/userControllers.js";
import { checkAuth } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route("/register").post(registerUser)
router.route("/login").post(authUser);

router
  .route("/:id")
  .delete(checkAuth, deleteUser)
  .get(checkAuth, getUserById)
  .put(checkAuth, updateUser);

export default router;
