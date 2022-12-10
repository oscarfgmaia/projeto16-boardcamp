import { Router } from "express";
import { create, findAll } from "../controllers/categories.controllers.js";
import categoryValidate from "../middlewares/categoryValidade.js";
const router = Router();

router.post("/categories",categoryValidate,create);
router.get("/categories",findAll);

export default router;