import express from "express";
import authRoutes from "./auth.routes.js";
import provinceRoutes from "./province.routes.js";
import destinationRoutes from "./destination.routes.js";
import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";
import districtRoutes from "./district.routes.js";
import wardRoutes from "./ward.routes.js";
import categoryRoutes from "./category.routes.js";
import subcategoryRoutes from "./subcategory.routes.js";
import tripRoutes from "./trip.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/province", provinceRoutes);
router.use("/district", districtRoutes);
router.use("/ward", wardRoutes);
router.use("/destination", destinationRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/subcategory", subcategoryRoutes);
router.use("/trip", tripRoutes);

export default router;
