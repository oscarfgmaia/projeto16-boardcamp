import { Router } from "express";
import { create, findAll } from "../controllers/games.controllers.js";
import gameValidate from "../middlewares/gameValidadte.js";
const router = Router();

router.post("/games",gameValidate,create);
router.get("/games",findAll);

export default router;