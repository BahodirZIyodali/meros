import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { sub_categories } from "./sub_categories.entity"

@Entity({
  name: "categories",
})
export class categories {
  @PrimaryGeneratedColumn("uuid")
  category_id: string

  @Column({
    type: "character varying",
    length: 128,
  })
  title: string

  @OneToMany(() => sub_categories, (Sub_categories) => Sub_categories.categories)
  sub_categories: sub_categories[]
}
