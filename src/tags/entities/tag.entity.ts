import { Blog } from 'src/blogs/entities/blog.entity';
import { CommonEntity } from 'src/common/entities/common-entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];
}
