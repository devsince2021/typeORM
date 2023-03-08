require("dotenv").config();
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import express, { json } from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_client";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.DB_PORT ?? 0),
      username: process.env.USERNAME,
      password: undefined,
      database: process.env.DATABASE,
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    console.log("connected!");
    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(deleteClientRouter);
    app.use(fetchClientRouter);

    app.listen(8080, () => {
      console.log("running on 8080");
    });
  } catch (err) {
    console.error(err);
    throw new Error("unable to connect protgres");
  }
};

main();
