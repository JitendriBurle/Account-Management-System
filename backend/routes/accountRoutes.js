import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  getBalance,
  getUsers,
  transferMoney,
  getStatement
} from "../controllers/accountController.js";

const router = express.Router();

router.get("/balance", protect, getBalance);
router.get("/users", protect, getUsers);
router.get("/statement", protect, getStatement);
router.post("/transfer", protect, transferMoney);

export default router;