import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { products } from "./product.entity"
import { users } from "./users.entity"

@Entity({
  name: "comments",
})
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string

  @Column({
    type: "character varying",
    length: 600,
  })
  commentary: string

  @ManyToOne(() => products, (Products) => Products.Comments)
  products: products

  @ManyToOne(() => users, (users) => users.Comments)
  users: users
  // ManyToOne(() => sub_sub_categories, (Sub_sub_categories) => Sub_sub_categories.products)
  // sub_sub_categories: sub_sub_categories
}
