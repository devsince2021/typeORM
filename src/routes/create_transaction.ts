import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;

  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  if (!client) {
    return res.json({ msg: "client not found" });
  }

  const transaction = Transaction.create({ type, amount, client });
  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance + amount;
  } else {
    client.balance = client.balance - amount;
  }

  await client.save();

  return res.json({ msg: "transaction added" });
});

export { router as createTransactionRouter };
