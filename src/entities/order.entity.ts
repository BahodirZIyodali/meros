import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { products } from "./product.entity"
import { users } from "./users.entity"

@Entity({
  name: "orders",
})
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  OrderId: string
  @Column({
    nullable: true,
    default: 0,
  })
  count: number

  @ManyToOne(() => users, (users) => users.Orders)
  costumer: users

  @ManyToOne(() => products, (Products) => Products.Orders)
  Products: products
}
