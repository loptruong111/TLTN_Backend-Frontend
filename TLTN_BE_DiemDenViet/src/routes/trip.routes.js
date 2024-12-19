import express from "express";
import TripController from "../controllers/trip.controllers.js";
import { validateGenerateTrip, validateId } from "../middlewares/validator.js";
import AuthMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", validateGenerateTrip, TripController.generate);
router.get("/:id", TripController.get);
router.get("/", TripController.getAll);
router.delete(
  "/:id",
  AuthMiddleware.verifyThisUserOrAdmin,
  validateId,
  TripController.delete
);

export default router;
