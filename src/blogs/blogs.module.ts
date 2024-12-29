import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from 'src/categories/entities/sub-category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, SubCategory, Tag])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
