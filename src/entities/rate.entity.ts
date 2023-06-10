import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { products } from "./product.entity"

@Entity({
  name: "evaluation",
})
export class Evaluation {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "int",
    default: 0,
  })
  star: number

  @Column({
    type: "int",
    default: 0,
  })
  increment: number

  @Column("decimal", {
    nullable: true,
    default: 0,
  })
  average: number

  @OneToOne(() => products, (Products) => Products.Evaluation)
  @JoinColumn()
  Products: products
}
