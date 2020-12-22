import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sender: string;

  @Column()
  recipient: string;
}
