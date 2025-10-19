import express from "express";
const router = express.Router();
import { addVitals, getVitals } from "../controllers/vitalsController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addVitals).get(protect, getVitals);

export default router;
