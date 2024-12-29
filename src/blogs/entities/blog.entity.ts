import { SubCategory } from 'src/categories/entities/sub-category.entity';
import { CommonEntity } from 'src/common/entities/common-entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Blog extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  viewCount: number;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.id)
  subCategories: SubCategory;

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable()
  tags: Tag[];

  @Column()
  isPublished: boolean;
}
