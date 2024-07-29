import { INestApplication } from '@nestjs/common';
import session from 'express-session';
import { createClient } from 'redis';
import passport from 'passport';
import RedisStore from 'connect-redis';

export function initSession(app: INestApplication): void {
  // const RedisStore = require('connect-redis').default;
  const appName = process.env.APP_NAME ?? 'API';
  const sessionMaxAge = process.env.SESSION_MAX_AGE ?? 3600000;

  const redisClient = createClient({
    url: process.env.WORKER_HOST ?? '127.0.0.1:6379',
  });
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: `${appName}:`,
  });

  app.use(
    session({
      store: redisStore,
      resave: false, //모든 request 마다 기존에 있던 session에 아무런 변경사항이 없을 시에도 그 session 을 다시 저장. 대체로 false 로 함
      saveUninitialized: false, // request 에 session 값이 없으면 초기화 작업을 할 것인가  , 공식 레퍼런스 false , 로그인할떄만
      secret: appName, // 세션 id 쿠키에 서명 할 때 사용
      cookie: {
        secure: false, // https 환경에서만 session 정보를 주고받도록 처리
        httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        maxAge: Number(sessionMaxAge), // 세션 유지시간
      },
    }),
  );

  app.use(passport.initialize()); //로그인 과 같은 사용자 인증 라이브러리
  app.use(passport.session());
}
