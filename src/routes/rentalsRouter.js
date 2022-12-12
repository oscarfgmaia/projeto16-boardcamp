import { Router } from "express";
import { create, findAll, deleteById } from "../controllers/rentals.controllers.js";
const router = Router();

router.post("/rentals", create);
router.get("/rentals", findAll);
router.delete("/rentals/:id", deleteById);
export default router;