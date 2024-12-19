import express from "express";
import UserController from "../controllers/user.controllers.js";
import { validateId, validatePutUser } from "../middlewares/validator.js";
import AuthMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/user-by-token", UserController.getByToken);
router.get("/", UserController.getAll);
router.put("/:id", validateId, validatePutUser, UserController.put);
router.put("/:id/byadmin", validateId, UserController.putByAdmin);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  UserController.delete
);

export default router;
