require("dotenv").config();
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import express, { json } from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";

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

    app.listen(8080, () => {
      console.log("running on 8080");
    });
  } catch (err) {
    console.error(err);
    throw new Error("unable to connect protgres");
  }
};

main();
