import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './create-movie.dto';

// PartialType 부분 타입 설정
// PartialType(CreateMovieDto) 전부 필수 타입이 아니도록 설정
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
