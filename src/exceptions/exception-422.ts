import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';
import { ErrorMessage } from '../constants/error-message';

export class UserNotFoundException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.UserNotFound);
  }
}

export class IncorrectPasswordException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.IncorrectPassword);
  }
}

export class IncorrectOldPasswordException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.IncorrectOldPassword);
  }
}

export class InactiveUserException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.InactiveUser);
  }
}

export class MissingOldPasswordException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.MissingOldPassword);
  }
}

export class CodeNotFoundException extends UnprocessableEntityException {
  constructor() {
    super(ErrorMessage.CodeNotFound);
  }
}
