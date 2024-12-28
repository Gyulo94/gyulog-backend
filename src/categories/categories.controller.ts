import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/common/pipe/id-validation-pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Post('subcategories')
  subCreate(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.subCreate(dto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('subcategories')
  subFindAll() {
    return this.categoriesService.subFindAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get('subcategories/:id')
  subFindOne(@Param('id', IdValidationPipe) id: number) {
    return this.categoriesService.subFindOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Patch('subcategories/:id')
  subUpdate(
    @Param('id', IdValidationPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.subUpdate(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.categoriesService.remove(id);
  }

  @Delete('subcategories/:id')
  subRemove(@Param('id', IdValidationPipe) id: number) {
    return this.categoriesService.subRemove(id);
  }
}
