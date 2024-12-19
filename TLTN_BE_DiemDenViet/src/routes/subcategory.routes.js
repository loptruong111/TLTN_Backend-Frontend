import express from "express";
import {
  validateId,
  validatePostSubcategory,
} from "../middlewares/validator.js";
import AuthMiddleware from "../middlewares/verifyToken.js";
import SubcategoryController from "../controllers/subcategory.controllers.js";

const router = express.Router();

router.post(
  "/",
  AuthMiddleware.verifyAdmin,
  validatePostSubcategory,
  SubcategoryController.post
);
router.get("/getforselect", SubcategoryController.getForSelect);
router.get("/:id", validateId, SubcategoryController.get);
router.get("/", SubcategoryController.getAll);
router.put(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  validatePostSubcategory,
  SubcategoryController.put
);
router.delete(
  "/:id",
  AuthMiddleware.verifyAdmin,
  validateId,
  SubcategoryController.delete
);

export default router;
