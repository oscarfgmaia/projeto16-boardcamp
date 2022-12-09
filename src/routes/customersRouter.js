import { Router } from "express";
import { create, findAll,findById } from "../controllers/customers.controllers.js";
const router = Router();

router.post("/customers",create);
router.get("/customers",findAll);
router.get("/customers/:id",findById);

export default router;