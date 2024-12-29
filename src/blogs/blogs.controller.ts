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
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() dto: CreateBlogDto) {
    return this.blogsService.create(dto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number,
    @Body() dto: UpdateBlogDto,
  ) {
    return this.blogsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.blogsService.remove(id);
  }
}
