import express from "express";
import getCategory from "../controller/categoryController.js";
const router = express.Router();

router.route("/").get(getCategory);

export default router;
