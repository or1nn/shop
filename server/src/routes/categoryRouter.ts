import { Router } from "express";
import typeController from "../controllers/categoryController";

const router = Router();

router.post('/create', typeController.create);
router.get('/', typeController.getAll);

export default router;