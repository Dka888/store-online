
import { Router } from "express";
const router = Router();
import * as productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authorization.js";

router.post("/add", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);




router.post("/products/add-many", productController.addManyProducts);

export default router;