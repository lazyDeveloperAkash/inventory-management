import express from "express";
import * as productController from "../controllers/productController.js";
import { validate } from "../middleware/validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.schema.js";

const router = express.Router();

router.get("/stats", productController.getProductStats);
router.post(
  "/",
  validate(createProductSchema),
  productController.createProduct
);
router.get("/", productController.getAllProducts);
router.get("/report/low-stock", productController.getLowStockProducts);
router.get("/export/csv", productController.exportCsv);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

export default router;
