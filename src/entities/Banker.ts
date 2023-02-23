import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./utils/Person";

@Entity("banker")
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  employee_number: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
