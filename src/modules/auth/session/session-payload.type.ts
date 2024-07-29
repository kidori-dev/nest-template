import { User } from 'src/modules/user/entities/user.entity';

export type SessionPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: number;
  iat: number;
  exp: number;
};
