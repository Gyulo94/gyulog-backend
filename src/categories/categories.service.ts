import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.save(dto);
  }

  async subCreate(dto: CreateCategoryDto) {
    const parentCategory = await this.categoryRepository.findOne({
      where: { id: dto.parentsId },
    });
    return await this.subCategoryRepository.save({
      parents: parentCategory,
      ...dto,
    });
  }

  findAll() {
    return this.categoryRepository.find({
      relations: {
        subcategories: true,
      },
      order: {
        id: 'ASC',
        subcategories: {
          id: 'ASC',
        },
      },
    });
  }

  subFindAll() {
    return this.subCategoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        subcategories: true,
      },
      order: {
        id: 'ASC',
        subcategories: {
          id: 'ASC',
        },
      },
    });
    if (!category) {
      throw new NotFoundException('해당 카테고리는 존재하지 않습니다.');
    }
    return category;
  }

  async subFindOne(id: number) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException('해당 서브 카테고리는 존재하지 않습니다.');
    }
    return subCategory;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('해당 카테고리는 존재하지 않습니다.');
    }
    return await this.categoryRepository.save({
      id,
      ...dto,
    });
  }

  async subUpdate(id: number, dto: UpdateCategoryDto) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException('해당 서브 카테고리는 존재하지 않습니다.');
    }
    return await this.subCategoryRepository.save({
      id,
      ...dto,
    });
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('해당 카테고리는 존재하지 않습니다.');
    }
    await this.categoryRepository.remove(category);
    return id;
  }

  async subRemove(id: number) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException('해당 서브 카테고리는 존재하지 않습니다.');
    }
    await this.subCategoryRepository.remove(subCategory);
    return id;
  }
}
