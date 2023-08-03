
import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userController.js";

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;


