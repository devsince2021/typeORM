require("dotenv").config();
import { createConnection } from "typeorm";

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.HOST,
      port: Number(process.env.DB_PORT ?? 0),
      username: process.env.USERNAME,
      password: undefined,
      database: process.env.DATABASE,
    });

    console.log("connected!");
  } catch (err) {
    console.error(err);
    throw new Error("unable to connect protgres");
  }
};

main();
