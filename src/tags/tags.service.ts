import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}
  create(dto: CreateTagDto) {
    return this.tagRepository.save(dto);
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('해당 태그를 찾을 수 없습니다.');
    }
    return tag;
  }

  async update(id: number, dto: UpdateTagDto) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('해당 태그를 찾을 수 없습니다.');
    }
    return this.tagRepository.save({ id, ...dto });
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('해당 태그를 찾을 수 없습니다.');
    }
    await this.tagRepository.delete(id);
    return id;
  }
}
