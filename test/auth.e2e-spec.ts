import request from 'supertest';
import { ADMIN_USERNAME, ADMIN_PASSWORD, APP_URL } from './utils/constants';

describe('Auth (e2e)', () => {
  const app = `${APP_URL}/api/v1`;
  const agent = request.agent(app);

  it('로그인', () => {
    return agent
      .post('/auth/session/login')
      .send({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
      .expect(200);
  });

  it('세션체크', () => {
    return agent.get('/auth/session/check').expect(200);
  });

  it('로그아웃', () => {
    return agent.get('/auth/session/logout').expect(200);
  });
});
