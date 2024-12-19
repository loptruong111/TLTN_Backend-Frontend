import express from "express";
import ProvinceController from "../controllers/province.controllers.js";
import { validateId, validatePostProvince } from "../middlewares/validator.js";
import AuthMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validatePostProvince,
  ProvinceController.post
);
router.get("/", ProvinceController.getAll);
router.get("/getforselect", ProvinceController.getForSelect);
router.get("/:id", validateId, ProvinceController.get);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validatePostProvince,
  ProvinceController.put
);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  ProvinceController.delete
);

export default router;
