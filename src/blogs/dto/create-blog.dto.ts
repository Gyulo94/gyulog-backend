import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  subCategoriesId: number;

  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsNumber({}, { each: true })
  // tagIds: number[];
  @IsArray()
  @IsString({ each: true }) // 태그 이름을 문자열 배열로 받습니다.
  tags: string[];
}
