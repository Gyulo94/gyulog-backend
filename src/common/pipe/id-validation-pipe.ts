import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export class IdValidationPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () =>
        new BadRequestException('ID가 유효하지 않습니다.'),
    });
  }
}
