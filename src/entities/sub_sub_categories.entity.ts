import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { products } from "./product.entity"
import { sub_categories } from "./sub_categories.entity"

@Entity({
  name: "sub_sub_categories",
})
export class sub_sub_categories {
  @PrimaryGeneratedColumn("uuid")
  sub_sub_id: string

  @Column({
    type: "character varying",
    length: 128,
  })
  title: string

  @ManyToOne(() => sub_categories, (Sub_categories) => Sub_categories.sub_sub_categories)
  sub_categories: sub_categories

  @OneToMany(() => products, (Products) => Products.sub_sub_categories)
  @JoinColumn()
  products: products[]
}
