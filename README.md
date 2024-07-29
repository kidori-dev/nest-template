# API Template

### Description

### Framework

```
Nestjs
```

### Node

```
node: >=20.0.0
```

### Installing

```
yarn install
```

### Database

```
mysql: 8.0.29

yarn migration:run

yarn migration:generate
- entity의 모델과 DB를 비교하여 업데이트 부분을 알아서 작성 (추천X)

yarn migration:create
- 직접 작성해야 함 (추천)

```



### Start

- prod start
    ```bash
    $ yarn build
    $ yarn start:prod
    ```
- dev start
    ```bash
    $ yarn start:dev
    ```

### Authentication

> `auth` middleware를 통해 요청에 Session 을 검증을 수행

### Routing

> `src/modules/모듈/controller` 를 통해 라우팅이 등록됩니다.

### Testing

- API 테스트
    ```bash
    $ yarn test:e2e
    ```

### Links

- Api: <http://localhost:{port}/api>
- Swagger: <http://localhost:{port}/api/docs>
