import express from "express";
import AuthMiddleware from "../middlewares/verifyToken.js";
import { validateId, validatePostWard } from "../middlewares/validator.js";
import WardController from "../controllers/ward.controllers.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validatePostWard,
  WardController.post
);
router.get("/getforselect", WardController.getForSelect);
router.get("/:id", validateId, WardController.get);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validatePostWard,
  WardController.put
);
router.get("/", WardController.getAll);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  WardController.delete
);

export default router;
