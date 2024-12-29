import { Blog } from 'src/blogs/entities/blog.entity';
import { CommonEntity } from 'src/common/entities/common-entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('sub_categories')
export class SubCategory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  parents: Category;

  @OneToMany(() => Blog, (blog) => blog.subCategories)
  blogs: Blog[];
}
