## Nest.js 설치

```
$ npm i -g @nestjs/cli

$ nest new

? What name would you like to use for the new project?
$ 프로젝트명 입력

? Which package manager would you ❤️  to use?
$ 사용할 package manager 선택
```

## Nest.js Basic Architecture

**Main.ts**

`Main.ts` 파일에서 하나의 모듈로 어플리케이션을 생성합니다.

이때 `AppModule`은 모든 모듈의 루트 모듈입니다.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

**Moudle**

기본 모듈을 확인하면 아래와 같습니다.

`@Module` 클래스안에 `Controller`는 `URL`을 가져오고 그에 맞는 함수를 실행하는것 입니다.

`nodeJS`에 `Router/Controller` 기능이라고 이해하면 됩니다.

```typescript
/** app.module.ts */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Controller**

다음으로 기본 모듈에 있는 `Controller`를 확인해봅시다.

기본 `Controller`에는 `@Get`이란 데코레이터가 있습니다.

데코레이터는 **클래스, 메서드, 접근자, 프로퍼티, 매개변수**에 적용이 가능하며 아래의 `@Get`은 `Express`의 `Get Router`와 같은 역할을 합니다.

```typescript
/** app.controller.ts */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

**Service**

`Contoller`를 보면 `appService.getHello()`를 사용했는데, 이는 `Controller`는 `URL`을 가져오고 함수를 실행만 해주고, `Service`는 실제 함수의 로직으로 구분한 것입니다.

따라서 `app.service.ts`를 확인하면 아래와 같이 `appService`의 `getHello` 함수에 로직을 확인하실 수 있습니다.

```typescript
/** app.service.ts */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }
}
```

## Nest CLI

```
┌───────────────┬─────────────┬──────────────────────────────────────────────┐
│ name          │ alias       │ description                                  │
│ application   │ application │ Generate a new application workspace         │
│ class         │ cl          │ Generate a new class                         │
│ configuration │ config      │ Generate a CLI configuration file            │
│ controller    │ co          │ Generate a controller declaration            │
│ decorator     │ d           │ Generate a custom decorator                  │
│ filter        │ f           │ Generate a filter declaration                │
│ gateway       │ ga          │ Generate a gateway declaration               │
│ guard         │ gu          │ Generate a guard declaration                 │
│ interceptor   │ itc         │ Generate an interceptor declaration          │
│ interface     │ itf         │ Generate an interface                        │
│ middleware    │ mi          │ Generate a middleware declaration            │
│ module        │ mo          │ Generate a module declaration                │
│ pipe          │ pi          │ Generate a pipe declaration                  │
│ provider      │ pr          │ Generate a provider declaration              │
│ resolver      │ r           │ Generate a GraphQL resolver declaration      │
│ service       │ s           │ Generate a service declaration               │
│ library       │ lib         │ Generate a new library within a monorepo     │
│ sub-app       │ app         │ Generate a new application within a monorepo │
│ resource      │ res         │ Generate a new CRUD resource                 │
└───────────────┴─────────────┴──────────────────────────────────────────────┘
```

## Class 유효성 검사

```
$ npm i class-validator class-transformer
```

## Test

**Jest가 .spec.ts 파일들을 찾아 테스트 할 수 있도록 세팅 되어 있습니다.**

npm run test:cov - 코드가 얼마나 테스팅 됐는지 확인

npm run test:watch - 모든 테스트 파일을 찾아 테스트 결과를 확인

## Test 종류

- 유닛 테스팅 : 함수 하나만 테스트하고 싶을 때 사용, spec.ts 파일들은 모두 유닛 테스트를 위한 파일

- e2e(End to End) 테스팅 : 모든 시스템을 테스트하고 싶을 때 사용, test 디렉토리안에 app.e2e-spec.ts 파일로 테스트
