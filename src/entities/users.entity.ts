import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Comments } from "./comments.entity"
import { Orders } from "./order.entity"

@Entity({
  name: "users",
})
export class users {
  @PrimaryGeneratedColumn("uuid")
  user_id: string

  @Column({
    type: "character varying",
    length: 64,
  })
  user_number: string

  @Column({
    type: "character varying",
    length: 125,
  })
  password: string

  @Column({
    type: "character varying",
    length: 125,
  })
  user_mail: string

  @Column({
    type: "character varying",
    length: 64,
  })
  user_name: string

  @Column({
    type: "character varying",
    length: 64,
    nullable: true,
  })
  user_surname: string

  @Column({
    type: "int",
    nullable: true,
  })
  user_was_born: number

  @Column({
    type: "character varying",
    length: 15,
    nullable: true,
  })
  user_s: string

  @Column({
    type: "character varying",
    length: 200,
    nullable: true,
  })
  user_img: string

  @OneToMany(() => Comments, (Comments) => Comments.users)
  Comments: Comments[]

  @OneToMany(() => Orders, (order) => order.costumer)
  Orders: Orders
}
