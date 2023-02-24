require("dotenv").config();
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";

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
  } catch (err) {
    console.error(err);
    throw new Error("unable to connect protgres");
  }
};

main();
