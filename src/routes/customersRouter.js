import { Router } from "express";
import { create, findAll } from "../controllers/customers.controllers.js";
const router = Router();

router.post("/customers",create);
router.get("/customers",findAll);

export default router;