import { Router } from "express";
import { create, findAll,findById } from "../controllers/customers.controllers.js";
import customerValidate from "../middlewares/customerValidate.js";
const router = Router();

router.post("/customers",customerValidate,create);
router.get("/customers",findAll);
router.get("/customers/:id",findById);

export default router;