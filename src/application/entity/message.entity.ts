import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  content: string;
}
