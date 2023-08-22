import { Router } from "express";
const router = Router();
import * as basketController from '../controllers/basketController.js'
import authMiddleware from "../middleware/authorization.js";

router.post("/add", basketController.addToBasket);
router.get("/", basketController.getBasket);

router.delete("/:id", authMiddleware, basketController.deleteProductFromBasket);

export default router;