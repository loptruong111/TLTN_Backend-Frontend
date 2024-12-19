import express from "express";
import AuthMiddleware from "../middlewares/verifyToken.js";
import { validateId, validatePostDistrict } from "../middlewares/validator.js";
import DistrictController from "../controllers/district.controllers.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validatePostDistrict,
  DistrictController.post
);
router.get("/", DistrictController.getAll);
router.get("/getforselect", DistrictController.getForSelect);
router.get("/:id", validateId, DistrictController.get);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validatePostDistrict,
  DistrictController.put
);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  DistrictController.delete
);

export default router;
