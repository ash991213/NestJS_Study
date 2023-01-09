import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 새로운 어플리케이션 모듈을 생성
  const app = await NestFactory.create(AppModule);
  // 유효성 검사를 위해 사용할 파이프를 useGlobalPipes 인자값으로 전달
  app.useGlobalPipes(
    new ValidationPipe({
      // Class에 선언된 변수들만 처리하고 그 외의 변수들은 버림
      whitelist: true,
      // Class에 정의되지 않은 프로퍼티를 차단
      forbidNonWhitelisted: true,
      // parameter 값을 원하는 Type으로 변경
      transform: true,
    }),
  );
  // 어플리케이션 실행
  await app.listen(3000);
}

bootstrap();
