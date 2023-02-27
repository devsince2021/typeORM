import express from "express";
import { Banker } from "../entities/Banker";

const router = express.Router();

router.post("/api/banker", async (req, res) => {
  const { lastName, firstName, email, cardNumber, balance, employeeNumber } =
    req.body;
  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
});

export { router as createBankerRouter };
