import { Router } from "express";
import { create, findAll } from "../controllers/rentals.controllers.js";
const router = Router();

router.post("/rentals",create);
router.get("/rentals",findAll);

export default router;