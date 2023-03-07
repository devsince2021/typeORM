import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  if (!banker || !client) {
    return res.json({ msg: "one of them is empty" });
  }

  banker.clients = banker.clients ? [...banker.clients, client] : [client];

  await banker?.save();

  return res.json({ msg: "both connected" });
});

export { router as connectBankerToClientRouter };
