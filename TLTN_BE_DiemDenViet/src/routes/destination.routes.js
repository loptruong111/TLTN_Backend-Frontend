import express from "express";
import DestinationController from "../controllers/destination.controllers.js";
import AuthMiddleware from "../middlewares/verifyToken.js";
import {
  validateId,
  validatePostDestination,
} from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validatePostDestination,
  DestinationController.post
);
router.get("/", DestinationController.getAll);
router.get("/search", DestinationController.search);
router.get("/:id", validateId, DestinationController.get);
router.get("/:id/update", validateId, DestinationController.getForUpdate);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validatePostDestination,
  DestinationController.put
);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  DestinationController.delete
);

export default router;
