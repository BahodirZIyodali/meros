import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { categories } from "./categories.entity"
import { sub_sub_categories } from "./sub_sub_categories.entity"

@Entity({
  name: "sub_categories",
})
export class sub_categories {
  @PrimaryGeneratedColumn("uuid")
  sub_id: string

  @Column({
    type: "character varying",
    length: 128,
  })
  title: string

  @ManyToOne(() => categories, (Categories) => Categories.sub_categories)
  categories: categories

  @OneToMany(() => sub_sub_categories, (Sub_sub_categories) => Sub_sub_categories.sub_categories)
  sub_sub_categories: sub_sub_categories[]
}
