import express from "express";
import { createQueryBuilder } from "typeorm";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  const clients = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.last_name")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions")
    .where("client.balance > :balance", { balance: 10 })
    .getMany();

  res.json(clients);
});

export { router as fetchClientRouter };
