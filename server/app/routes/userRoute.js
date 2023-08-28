
import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userController.js";

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
router.patch("/username/:id", userController.updateUser);
router.patch("/email/:id", userController.updateMail);
router.delete("/:id", userController.deleteUser);

export default router;


