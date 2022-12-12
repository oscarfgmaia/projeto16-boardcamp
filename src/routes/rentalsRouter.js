import { Router } from "express";
import { create, findAll, deleteById, returnRental } from "../controllers/rentals.controllers.js";
const router = Router();

router.post("/rentals", create);
router.post("/rentals/:id/return", returnRental)
router.get("/rentals", findAll);
router.delete("/rentals/:id", deleteById);
export default router;