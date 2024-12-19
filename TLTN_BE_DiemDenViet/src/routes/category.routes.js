import express from "express";
import { validateId, validateName } from "../middlewares/validator.js";
import AuthMiddleware from "../middlewares/verifyToken.js";
import CategoryController from "../controllers/category.controllers.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validateName,
  CategoryController.post
);
router.get("/getforselect", CategoryController.getForSelect);
router.get("/:id", validateId, CategoryController.get);
router.get("/", CategoryController.getAll);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validateName,
  CategoryController.put
);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  CategoryController.delete
);

export default router;
