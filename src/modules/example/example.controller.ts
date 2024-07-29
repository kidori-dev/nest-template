import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExampleService } from './example.service';

@ApiTags('Example')
@Controller({
  path: 'example',
  version: '1',
})
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'GET',
    description: `GET 요청 예제`,
  })
  async exampleGet(): Promise<string> {
    return await this.exampleService.exampleGet();
  }
}
