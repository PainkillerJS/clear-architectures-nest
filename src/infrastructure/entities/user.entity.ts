import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column("varchar", { unique: true })
  username: string;

  @Column("text")
  password: string;

  @CreateDateColumn({ name: "create-date" })
  createDate: Date;

  @UpdateDateColumn({ name: "updated-date" })
  updatedDate: Date;

  @Column("varchar", { nullable: true })
  hash_refresh_token: string;

  @Column({ nullable: true })
  last_login?: Date;
}
