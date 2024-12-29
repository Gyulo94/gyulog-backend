import { CommonEntity } from 'src/common/entities/common-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub-category.entity';

@Entity()
export class Category extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.parents)
  subcategories: SubCategory[];
}
