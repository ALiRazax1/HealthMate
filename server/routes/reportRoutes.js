import express from "express";
const router = express.Router();
import {
  uploadReport,
  getTimeline,
  getReportById,
} from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "healthmate_reports", // Cloudinary pe folder ka naam
    allowed_formats: ["jpeg", "png", "jpg", "pdf"],
  },
});

const upload = multer({ storage: storage });

// Routes
router
  .route("/upload")
  .post(protect, upload.single("reportFile"), uploadReport);

router.route("/timeline").get(protect, getTimeline);
router.route("/:id").get(protect, getReportById);

export default router;
