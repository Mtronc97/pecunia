import { Router } from "express";
import {
    getTransactions,
    getTransaction,
    createTransaction,
    removeTransaction
} from "../controllers/transaction.controller"

const router = Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.delete("/:id", removeTransaction);

export default router;