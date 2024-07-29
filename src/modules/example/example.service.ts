import { Injectable } from '@nestjs/common';
import cryptoJs from 'crypto-js';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { encryptSha256 } from '../../utils/helper';

@Injectable()
export class ExampleService {
  constructor() {}

  async exampleGet(): Promise<any> {
    return encryptSha256(randomStringGenerator());
  }
}
