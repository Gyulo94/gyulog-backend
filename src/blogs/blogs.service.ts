import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'src/categories/entities/sub-category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(dto: CreateBlogDto) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: dto.subCategoriesId },
    });
    if (!subCategory) {
      throw new NotFoundException('해당 서브 카테고리를 찾을 수 없습니다.');
    }
    const tagArr = await Promise.all(
      dto.tags.map(async (tags) => {
        let tag = await this.tagRepository.findOne({
          where: { name: tags },
        });
        if (!tag) {
          tag = this.tagRepository.create({ name: tags });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );
    const blog = await this.blogRepository.save({
      title: dto.title,
      content: dto.content,
      isPublished: dto.isPublished,
      subCategories: subCategory,
      tags: tagArr,
    });
    return blog;
  }

  findAll() {
    return this.blogRepository.find({
      relations: ['subCategories', 'tags'],
    });
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['subCategories', 'tags'],
    });
    if (!blog) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    return blog;
  }

  async update(id: number, dto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['subCategories', 'tags'],
    });
    if (!blog) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    let newSubCategory;
    if (dto.subCategoriesId) {
      const subCategory = await this.subCategoryRepository.findOne({
        where: { id: dto.subCategoriesId },
      });
      if (!subCategory) {
        throw new NotFoundException('해당 서브 카테고리를 찾을 수 없습니다.');
      }
      newSubCategory = subCategory;
    }
    const tagArr = await Promise.all(
      dto.tags.map(async (tags) => {
        let tag = await this.tagRepository.findOne({
          where: { name: tags },
        });
        if (!tag) {
          tag = this.tagRepository.create({ name: tags });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const blogUpdateFields = {
      title: dto.title,
      content: dto.content,
      isPublished: dto.isPublished,
      tags: tagArr,
      ...(newSubCategory && { subCategories: newSubCategory }),
    };

    console.log(blogUpdateFields);
    await this.blogRepository.save({ id, ...blogUpdateFields });

    return this.blogRepository.findOne({
      where: { id },
      relations: ['subCategories', 'tags'],
    });
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    await this.blogRepository.delete(id);
    return id;
  }
}
