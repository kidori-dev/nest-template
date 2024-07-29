import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { ErrorMessage } from '../constants/error-message';

export class NotFoundMirrorNodeException extends InternalServerErrorException {
  constructor() {
    super(ErrorMessage.NotFoundMirrorNode);
  }
}
